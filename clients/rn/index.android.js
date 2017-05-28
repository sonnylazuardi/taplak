'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

import App from './containers/App';
import Login from './containers/Login';
import {connect} from 'react-redux';
import * as appActions from './actions/AppActions';

class Wrapper extends Component {
  componentWillMount() {
    AsyncStorage.getItem('loggedIn')
      .then(data => JSON.parse(data))
      .then(loggedIn => {
        if (loggedIn) {
          this.props.dispatch(appActions.setLoggedIn(true));
        }
      });

    AsyncStorage.getItem('userData')
      .then(data => JSON.parse(data))
      .then(userData => {
        console.log('USERDATA', userData);
        if (userData) {
          this.props.dispatch(appActions.setUserData(userData));
        }
      });

      AsyncStorage.getItem('userProfile')
        .then(data => JSON.parse(data))
        .then(userProfile => {
          console.log('userProfile', userProfile);
          if (userProfile) {
            this.props.dispatch(appActions.setUserProfile(userProfile));
          }
        });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }
}

Wrapper = connect(state => ({
  app: state.app
}))(Wrapper);

const AppWrapper = () => (
  <Provider store={store}>
    <Wrapper>
      <App />
    </Wrapper>
  </Provider>
);

const LoginWrapper = () => (
  <Provider store={store}>
    <Wrapper>
      <Login />
    </Wrapper>
  </Provider>
);

AppRegistry.registerComponent('App', () => AppWrapper);
AppRegistry.registerComponent('Login', () => LoginWrapper);
