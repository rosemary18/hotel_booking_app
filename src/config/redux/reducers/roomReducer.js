import {GET_ROOM} from '../actions/types';

const initialState = {
  data: [],
  isLoading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM:
      return {
        data: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
