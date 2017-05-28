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

  }
  subscription2 = null;
  componentDidMount() {
    const floating = new NativeEventEmitter(FloatingAndroid);
    this.props.dispatch(appActions.setLoading(false));
    this.subscription2 = floating
      .addListener('CLIPBOARD_COPY', (text) => {
        console.log(`TEST: COPY CLIPBOARD ${text}`);
        AsyncStorage.setItem('clipboard', JSON.stringify(text));
      });
  }
  componentWillUnmount() {
    this.subscription.remove();
  }
  onLoggedIn = () => {
    this.props.dispatch(appActions.setLoggedIn(true));
  }
  onLoggedOut = () => {
    this.props.dispatch(appActions.setLoggedIn(false));
  }
  render() {
    const {showBalloon, loggedIn} = this.state;
    return (
      <View style={styles.container}>
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
});

export default connect(state => ({
  app: state.app,
}))(Login)
