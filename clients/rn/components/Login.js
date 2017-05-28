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
import {ToastAndroid} from 'react-native';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }
  onLogin = () => {
    const {email, password} = this.state;
    const {loggedIn, loading} = this.props.app;
    console.log('LOGIN', email, password);
    if (!loading && !loggedIn) {
      this.props.dispatch(appActions.login(email, password)).then(userData => {
        if (userData.status == 'OK') {
          AsyncStorage.setItem('loggedIn', JSON.stringify(true));
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          this.props.onLoggedIn && this.props.onLoggedIn();
        } else {

        }
      })
    } else {
      ToastAndroid.show('Login sedang dalam proses. Silakan coba dalam beberapa saat lagi', ToastAndroid.SHORT);
    }
  }
  onLogout = () => {
    this.props.dispatch(appActions.setLoggedIn(false));
    AsyncStorage.removeItem('loggedIn');
    this.props.dispatch(appActions.setUserData({}));
    AsyncStorage.removeItem('userData');
    this.props.onLoggedOut && this.props.onLoggedOut();
  }
  onLog
  render() {
    const {email, password} = this.state;
    const {loggedIn, userData} = this.props.app;
    return (
      <View style={styles.container}>
        {loggedIn ?
          <View>
            <Text>{userData.user_name}</Text>
            <Text>{userData.email}</Text>
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
