import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';

export class LoadingScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.replace(this.props.toScreen);
    }, 2000);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default LoadingScreen;
