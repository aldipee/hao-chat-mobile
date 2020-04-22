import {SET_LOGOUT} from '../actions/types';
import {combineReducers} from 'redux';

import AuthReducer from './AuthReducers';

const appReducer = combineReducers({
  authData: AuthReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === SET_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
