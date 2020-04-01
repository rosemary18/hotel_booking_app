import React, {Component} from 'react';
import {Text, View} from 'react-native';

class AuthScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4267b2',
        }}>
        <View
          style={{
            width: 300,
            height: 350,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 10,
          }}>
          <Text> AuthScreen </Text>
        </View>
      </View>
    );
  }
}

export default AuthScreen;
