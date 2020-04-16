import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import roomReducer from './roomReducer';
import cartReducer from './cartReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  room: roomReducer,
  cart: cartReducer,
});
