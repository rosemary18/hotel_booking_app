import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';

export class App extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar backgroundColor="red" />
        <Text>Hotel Booking App</Text>
      </View>
    );
  }
}

export default App;
