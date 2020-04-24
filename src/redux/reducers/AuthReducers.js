import {GET_USER_DATA, SET_LOGIN} from './../actions/types';
const initialState = {
  data: {},
  isLogin: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_USER_DATA:
      return {...state, data: payload};

    case SET_LOGIN:
      return {...state, data: payload, isLogin: true};
    default:
      return state;
  }
};
