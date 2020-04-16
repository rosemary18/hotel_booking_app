import React, {Component} from 'react';
import {Text, View, Image, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import setAuthToken from '../../config/utils/setAuthToken';
import {Logo} from '../../assets/img';
import {setCurrentUser} from '../../config/redux/actions/authActions';
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
        useNativeDriver: false,
      }).start(),
    ]).start();
    this._bootstarpAsync();
  }

  _bootstarpAsync = async () => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');

    if (jwtToken) {
      const userData = jwt_decode(jwtToken);
      setAuthToken(jwtToken);
      this.props.setCurrentUser(userData);
      if (userData.userType === 'user') {
        Actions.replace('LoadingScreen', {toScreen: 'DrawerRoutes'});
      } else if (userData.userType === 'admin') {
        Actions.replace('LoadingScreen', {toScreen: 'AdminDrawer'});
      }
    } else {
      setTimeout(SwitchToAuth, 2000);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}>
        <Animated.View
          style={{
            opacity: this.state.logoAnim,
            top: this.state.logoAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} style={{width: 150, height: 80}} />
        </Animated.View>
      </View>
    );
  }
}

SplashScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {setCurrentUser},
)(SplashScreen);
