import React, {Component} from 'react';
import {Text, View, Image, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux';

import logo from '../../assets/img/logo.png';

const SwitchToAuth = () => {
  Actions.replace('Auth');
};
class SplashScreen extends Component {
  state = {
    logoAnim: new Animated.Value(0),
  };
  componentDidMount() {
    const {logoAnim} = this.state;
    Animated.parallel([
      Animated.spring(logoAnim, {
        toValue: 1,
        tension: 5,
        friction: 15,
        duration: 2500,
      }).start(),
    ]).start();
    setTimeout(SwitchToAuth, 2000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4267b2',
        }}>
        <Animated.View
          style={{
            opacity: this.state.logoAnim,
            top: this.state.logoAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={logo} style={{width: 150, height: 100}} />
        </Animated.View>
      </View>
    );
  }
}

export default SplashScreen;
