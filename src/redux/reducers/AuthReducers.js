import {GET_USER_DATA} from './../actions/types';
const initialState = {
  data: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_USER_DATA:
      return {...state, data: payload};

    default:
      return state;
  }
};
