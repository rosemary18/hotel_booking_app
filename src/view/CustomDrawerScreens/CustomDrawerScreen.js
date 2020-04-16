import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {User} from '../../assets/img';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../config/redux/actions/authActions';
export class CustomDrawerScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            borderBottomWidth: 1,
            borderBottomColor: '#f9f9f9',
          }}>
          <Image
            source={User}
            style={{
              backgroundColor: '#ffffff',
              width: 90,
              height: 90,
              borderRadius: 50,
              marginBottom: 15,
              borderColor: '#f9f9f9',
              borderWidth: 1,
            }}
          />
          {this.props.auth.user.fullname ? (
            <Text style={{color: '#889aa4'}}>
              {this.props.auth.user.fullname}
            </Text>
          ) : (
            <Text style={{color: '#889aa4'}}>-</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}>
          <View style={styles.ButtonNav}>
            <Icon name="home" color="#889aa4" />
            <Text style={{marginLeft: 10, color: '#889aa4'}}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('Redirect to Booked room soon ..')}>
          <View style={styles.ButtonNav}>
            <Icon name="class" color="#889aa4" />
            <Text style={{marginLeft: 10, color: '#889aa4'}}>Booked Room</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Settings')}>
          <View style={styles.ButtonNav}>
            <Icon name="settings" color="#889aa4" />
            <Text style={{marginLeft: 10, color: '#889aa4'}}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.logoutUser();
            Actions.replace('LoadingScreen', {toScreen: 'Splash'});
          }}>
          <View style={styles.ButtonNav}>
            <Icon name="exit-to-app" color="#889aa4" />
            <Text style={{marginLeft: 10, color: '#889aa4'}}>Logout</Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: 30,
              paddingLeft: 15,
              borderTopWidth: 1,
              borderTopColor: '#f9f9f9',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#889aa4', fontSize: 10}}>
              Version 100.23.5.1 &bull; 2020
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ButtonNav: {
    height: 50,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
CustomDrawerScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {logoutUser},
)(CustomDrawerScreen);
