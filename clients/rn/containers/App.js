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

const FloatingAndroid = NativeModules.FloatingAndroid;

class App extends React.Component {
  subscription = null;
  state = {
    showBalloon: true,
  }
  componentDidMount() {
    const floating = new NativeEventEmitter(FloatingAndroid);
    this.subscription = floating.addListener('SHOW_BALLOON',(showBalloon) => {
      console.log(`TEST: SHOW_BALLOON ${showBalloon}`);
      this.setState({
        showBalloon,
      });
    });
  }
  componentWillUnmount() {
    this.subscription.remove();
  }
  toggleShowBalloon = () => {
    const {showBalloon} = this.state;
    this.setState({
      showBalloon: !showBalloon,
    });
  }
  render() {
    const {showBalloon} = this.state;
    const {loggedIn} = this.props.app;
    return (
      <View style={styles.container}>
        {showBalloon ?
          <View style={styles.balloon}>
            <Image style={styles.imageLogo} source={require('../assets/icon.png')} />
          </View>
          :
          <View style={styles.box}>
            <Text style={styles.hello}>{loggedIn ? 'SUDAH LOGIN' : 'BELUM LOGIN'}</Text>
          </View>}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  balloon: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  imageLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default connect(state => ({
  app: state.app,
}))(App);
