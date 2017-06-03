import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Image,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';

import LoginView from '../components/Login';
import * as appActions from '../actions/AppActions';

const FloatingAndroid = NativeModules.FloatingAndroid;
import Base64 from '../utils/Base64';

class Login extends React.Component {
  state = {
    imageUrl: null
  }
  subscription2 = null;
  subscription3 = null;
  componentDidMount() {
    const floating = new NativeEventEmitter(FloatingAndroid);
    this.props.dispatch(appActions.setLoading(false));
    this.subscription2 = floating
      .addListener('CLIPBOARD_COPY', (text) => {
        console.log(`TEST: COPY CLIPBOARD ${text}`);
        AsyncStorage.setItem('clipboard', JSON.stringify(text), () => {
          FloatingAndroid.show();
        });
      });
    this.subscription3 = floating
      .addListener('IMAGE_SEND', (imageBase64) => {
          console.log(`TEST: IMAGE SEND`);
          this.props.dispatch(appActions.clarifyAi(imageBase64)).then((data) => {
              let imageName = data.outputs[0].data.concepts[0].name;
              this.props.dispatch(appActions.translate(imageName, true)).then((data) => {
                let clipboardText = data.text[0];
                console.log('IMAGE TRANSLATE', clipboardText);
                AsyncStorage.setItem('clipboard', JSON.stringify(clipboardText), () => {
                  FloatingAndroid.show();
                });
              });
          });
      });
  }
  componentWillUnmount() {
    this.subscription2.remove();
    this.subscription3.remove();
  }
  onLoggedIn = () => {
    this.props.dispatch(appActions.setLoggedIn(true));
  }
  onLoggedOut = () => {
    this.props.dispatch(appActions.setLoggedIn(false));
  }
  render() {
    const {imageUrl} = this.state;
    return (
      <View style={styles.container}>
        {imageUrl ?
          <Image source={{uri: `file://${imageUrl}`}} style={styles.image}/>
          : null}
        <LoginView
          onLoggedIn={this.onLoggedIn}
          onLoggedOut={this.onLoggedOut}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  }
});

export default connect(state => ({
  app: state.app,
}))(Login)
