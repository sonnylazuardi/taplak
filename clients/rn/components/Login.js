'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  NativeModules,
  NativeEventEmitter,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';
import * as appActions from '../actions/AppActions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }
  onLogin = () => {
    const {email, password} = this.state;
    console.log('LOGIN', email, password);
    this.props.dispatch(appActions.login(email, password)).then((result) => {
      console.log('RESULT', result)
    });
    // this.props.onLoggedIn && this.props.onLoggedIn();
  }
  onLogout = () => {
    this.props.onLoggedOut && this.props.onLoggedOut();
  }
  onLog
  render() {
    const {email, password} = this.state;
    const {loggedIn} = this.props.app;
    return (
      <View style={styles.container}>
        {loggedIn ?
          <View>
            <TouchableNativeFeedback onPress={this.onLogout}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          :
          <View>
            <TextInput
              value={email}
              placeholder={'Email'}
              onChangeText={(email) => {
                this.setState({email})
              }}/>
            <TextInput
              value={password}
              secureTextEntry={true}
              placeholder={'Password'}
              onChangeText={(password) => this.setState({password})}/>

            <TouchableNativeFeedback onPress={this.onLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableNativeFeedback>
          </View>}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F50057',
    padding: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#C51162',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default connect(state => ({
  app: state.app,
}))(Login);
