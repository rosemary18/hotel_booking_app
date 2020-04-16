import axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SET_CURRENT_USER, CLEAR_CURRENT_USER, GET_ERRORS} from './types';
import config_variable from '../../config-variables';
import setAuthToken from '../../utils/setAuthToken';

// Login User
export const loginUser = userData => async dispatch => {
  const apiPath = config_variable.api.host;
  if (userData) {
    await axios
      .post(
        'https://rosemary18-hotel-booking-app.herokuapp.com/api/user/login',
        userData,
      )
      .then(response => {
        const {token, user} = response.data;
        AsyncStorage.setItem('jwtToken', token);

        // Set token of request header
        setAuthToken(token);
        dispatch(setCurrentUser(user));

        ToastAndroid.show(
          'You have successfully logged in',
          ToastAndroid.SHORT,
        );
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};

//set login user
export const setCurrentUser = user => async dispatch => {
  await dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from async storage
  AsyncStorage.removeItem('jwtToken');
  // remove auth header for future request
  setAuthToken(false);
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: {},
  });
};
