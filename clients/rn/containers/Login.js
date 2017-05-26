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

class Login extends React.Component {
  state = {

  }
  onLoggedIn = () => {
    AsyncStorage.setItem('loggedIn', JSON.stringify(true));
    this.props.dispatch(appActions.setLoggedIn(true));
  }
  onLoggedOut = () => {
    AsyncStorage.setItem('loggedIn', JSON.stringify(false));
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
