import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class TopBarScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default TopBarScreen;
