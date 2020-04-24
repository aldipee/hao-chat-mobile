import {
  GET_USER_DATA,
  SET_LOGIN,
  UPDATE_IMAGE,
  SET_USER_LOCATION,
} from './../actions/types';
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

    case UPDATE_IMAGE: {
      const data = {...state.data};
      data.photo = payload;
      return {...state, data};
    }
    case SET_USER_LOCATION: {
      const data = {...state.data};
      data.location = payload;
      return {...state, data};
    }
    default:
      return state;
  }
};
