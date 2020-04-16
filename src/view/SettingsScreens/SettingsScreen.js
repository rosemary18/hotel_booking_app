import React, {Component} from 'react';
import {Text, View} from 'react-native';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#ffffff',
            shadowOpacity: 1,
            height: 50,
            justifyContent: 'center',
            paddingLeft: 15,
          }}>
          <Text style={{fontWeight: 'bold', color: '#889aa4'}}> SETTINGS </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Coming soon ...</Text>
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
