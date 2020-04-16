import axios from 'axios';
import {GET_ROOM, GET_ERRORS} from './types';

// Get Room
export const getRoom = () => async dispatch => {
  await axios
    .get('https://rosemary18-hotel-booking-app.herokuapp.com/api/room/')
    .then(response => {
      dispatch(setRoomData(response.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setRoomData = data => async dispatch => {
  await dispatch({
    type: GET_ROOM,
    payload: data,
  });
};
