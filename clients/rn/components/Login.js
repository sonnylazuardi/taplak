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
  Linking,
  ActivityIndicator,
  Switch
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
    this.props.dispatch(appActions.setUserProfile({}));
    AsyncStorage.removeItem('userData');
    this.props.onLoggedOut && this.props.onLoggedOut();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.app.userData != nextProps.app.userData) {
      this.props.dispatch(appActions.fetchUserProfile(nextProps.app.userData));
    }
  }
  onHelp = () => {
    Linking.openURL(`http://taplak.sonnylab.com/`).catch(err => console.error('An error occurred', err));
  }
  onCreateProduct = () => {
    this.props.onCreateProduct && this.props.onCreateProduct();
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(appActions.setLoading(false));
    }, 100);
  }
  render() {
    const {email, password} = this.state;
    const {loggedIn, userData, userProfile, loading} = this.props.app;
    return (
      <View style={styles.container}>
        {loggedIn ?
          <View style={styles.bg}>
            <View style={styles.headCover}>
              <Text style={styles.title}>Halo, <Text style={{fontWeight: '500'}}>{userData.user_name}</Text></Text>
              <Text style={styles.email}>{userData.email}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -40}}>
              <Image source={{uri: userProfile.avatar}} style={styles.avatar}/>
            </View>
            <View style={styles.actions}>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15, alignItems: 'center'}}>
                <Switch value={this.props.isSeller} onValueChange={(value) => {
                  this.props.setSeller && this.props.setSeller(value);
                }} />
                <Text style={{marginLeft: 10}}>Mode Penjual</Text>
              </View>
              <TouchableNativeFeedback onPress={this.onHelp}>
                <View style={styles.buttonPrimary}>
                  <Text style={styles.buttonPrimaryText}>Bantuan</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.onCreateProduct}>
                <View style={styles.buttonPrimary}>
                  <Text style={styles.buttonPrimaryText}>Tambah Produk</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.onLogout}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Logout</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          :
          <View style={styles.bg}>
            <View style={styles.headBar} />
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/taplakfront.jpg')} style={styles.image} resizeMode={'cover'}/>
            </View>
            <View style={styles.actions}>
              <TextInput
                value={email}
                ref="email"
                placeholder={'Email'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.refs.password.focus();
                }}
                onChangeText={(email) => {
                  this.setState({email})
                }}/>
              <TextInput
                ref="password"
                value={password}
                onSubmitEditing={() => {
                  this.onLogin();
                }}
                secureTextEntry={true}
                returnKeyType={'done'}
                placeholder={'Password'}
                onChangeText={(password) => this.setState({password})}/>

              {!loading ?
                <TouchableNativeFeedback>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </View>
                </TouchableNativeFeedback>
                :
                <TouchableNativeFeedback onPress={this.onLogin}>
                  <View style={styles.button}>
                    <ActivityIndicator />
                  </View>
                </TouchableNativeFeedback>}

            </View>
          </View>}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headBar: {
    height: 300,
    backgroundColor: '#cb0051',
  },
  button: {
    padding: 15,
    backgroundColor: '#cb0051',
    borderRadius: 4,
  },
  buttonPrimaryText: {
    textAlign: 'center',
    color: '#cb0051',
  },
  buttonPrimary: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cb0051',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    flex: 1,
    height: 400,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
  },
  image: {
    width: null,
    height: null,
    flex: 1,
  },
  headCover: {
    backgroundColor: '#cb0051',
    height: 140,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 40,
  },
  email: {
    textAlign: 'center',
    fontSize: 11,
    color: '#fff',
  },
});

export default connect(state => ({
  app: state.app,
}))(Login);
