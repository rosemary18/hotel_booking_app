import {GET_CART} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    default:
      return state;
  }
}
