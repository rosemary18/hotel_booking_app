import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class DashboardScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> DashboardScreen </Text>
        <Text onPress={() => this.props.navigation.navigate('Screen2')}>
          {' '}
          Go to RoomsScreen{' '}
        </Text>
      </View>
    );
  }
}

export default DashboardScreen;
