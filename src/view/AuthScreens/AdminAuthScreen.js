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

class AdminAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formAnimated: new Animated.Value(0),
    };
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
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#8ac6d1',
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
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Image source={Logo} style={{width: 100, height: 75}} />
            <Text style={{marginTop: 20, color: '#ffffff', fontSize: 24}}>
              Administrator Portal
            </Text>
          </View>
          <View
            style={{
              width: 300,
              backgroundColor: '#fffdf9',
              borderRadius: 25,
              padding: 20,
            }}>
            <View style={styles.ViewInput}>
              <Icon name="perm-identity" />
              <TextInput
                onChangeText={val => this.setState({username: val})}
                placeholder="Username ..."
                style={styles.InputField}
              />
            </View>
            <View style={styles.ViewInput}>
              <Icon name="vpn-key" />
              <TextInput
                onChangeText={val => this.setState({password: val})}
                maxLength={16}
                placeholder="Password ..."
                style={styles.InputField}
                secureTextEntry={true}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  alert(`${this.state.username}, ${this.state.password}`)
                }
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
    borderColor: '#8ac6d1',
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
    backgroundColor: '#8ac6d1',
    marginHorizontal: 5,
  },
  TextButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminAuthScreen;
