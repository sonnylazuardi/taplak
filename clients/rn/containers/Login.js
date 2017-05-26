'use strict';

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
  TextInput,
} from 'react-native';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }
  onLogin = () => {
    console.log('login');
    this.setState({email: 'sonnylazuardi@gmail.com'});
  }
  render() {
    const {email, password} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={email}
          placeholder={'Ganti'}
          onChange={(event) => {
            console.log('onchange', event.nativeEvent.text);
            this.setState({email: event.nativeEvent.text})
          }}
          onKeyPress={(event) => {
            console.log('keypress', event.nativeEvent.key);
            this.setState({email: event.nativeEvent.key})
          }}
          onChangeText={(email) => {
            console.log('email', email);
            this.setState({email})
          }}/>
        <TextInput value={password} secureTextEntry={true} placeholder={'Password'} onChangeText={(password) => this.setState({password})}/>

        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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

export default Login;
