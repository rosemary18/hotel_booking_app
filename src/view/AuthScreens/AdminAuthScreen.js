import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Logo} from '../../assets/img';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../../config/redux/actions/authActions';
import PropTypes from 'prop-types';

class AdminAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userType: 'admin',
      errors: {},
      formAnimated: new Animated.Value(0),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({errors: {}});
      Actions.replace('LoadingScreen', {toScreen: 'AdminDrawer'});
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.formAnimated, {
        toValue: 1,
        tension: 5,
        friction: 15,
        duration: 2500,
        useNativeDriver: false,
      }).start(),
    ]).start();
  }

  handleSubmit = () => {
    const {email, password, userType} = this.state;
    const userData = {
      email,
      password,
      userType,
    };
    this.props.loginUser(userData);
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
            opacity: this.state.formAnimated,
            top: this.state.formAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <View
            style={{
              width: 300,
              backgroundColor: '#fff',
              borderRadius: 25,
              padding: 20,
              borderColor: '#889aa4',
              borderWidth: 1,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 25,
              }}>
              <Image source={Logo} style={{width: 75, height: 55}} />
              <Text style={{marginTop: 5, fontSize: 16, color: '#889aa4'}}>
                ADMINISTRATOR PORTAL
              </Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="perm-identity" color="#889aa4" />
              <TextInput
                onChangeText={val => this.setState({email: val})}
                placeholder="Email ..."
                style={styles.InputField}
              />
            </View>
            {this.state.errors.email ? (
              <Text style={{marginBottom: 10, color: 'red'}}>
                * {this.state.errors.email}
              </Text>
            ) : null}
            <View style={styles.ViewInput}>
              <Icon name="lock" color="#889aa4" />
              <TextInput
                onChangeText={val => this.setState({password: val})}
                maxLength={16}
                placeholder="Password ..."
                style={styles.InputField}
                secureTextEntry={true}
              />
            </View>
            {this.state.errors.password ? (
              <Text style={{marginBottom: 10, color: 'red'}}>
                * {this.state.errors.password}
              </Text>
            ) : null}
            <View>
              <TouchableOpacity
                onPress={() => {
                  /* Actions.replace('AdminDrawer'); */
                  this.handleSubmit();
                }}
                style={styles.ButtonStyle}>
                <Text style={styles.TextButton}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ViewInput: {
    width: '100%',
    borderRadius: 15,
    borderColor: '#889aa4',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    opacity: 0.8,
    paddingLeft: 15,
    borderWidth: 1,
  },
  InputField: {
    marginLeft: 10,
    width: 205,
    fontSize: 18,
  },
  ButtonStyle: {
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#889aa4',
  },
  TextButton: {
    color: '#889aa4',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

AdminAuthScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  {loginUser},
)(AdminAuthScreen);
