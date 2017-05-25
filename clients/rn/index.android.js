'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules
} from 'react-native';

const FloatingAndroid = NativeModules.FloatingAndroid;

class HelloWorld extends React.Component {
  state = {
    showBalloon: true,
  }
  toggleShowBalloon = () => {
    const {showBalloon} = this.state;
    this.setState({
      showBalloon: !showBalloon,
    }, () => {
      if (this.state.showBalloon) {
        FloatingAndroid.show();
      } else {
        FloatingAndroid.hide();
      }
    });
  }
  render() {
    const {showBalloon} = this.state;
    return (
      <View style={styles.container}>
        {showBalloon ?
          <TouchableOpacity style={styles.ballon} onPress={this.toggleShowBalloon}>
            <Text style={styles.hello}>Hide Balloon</Text>
          </TouchableOpacity>
          :
          <View style={styles.box}>
            <TouchableOpacity onPress={this.toggleShowBalloon}>
              <Text style={styles.hello}>Show Balloon</Text>
            </TouchableOpacity>
            <Text style={styles.hello}>Box</Text>
          </View>}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  ballon: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  box: {
    backgroundColor: '#888',
    width: 100,
    height: 100,
  }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
