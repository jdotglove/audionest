import { combineReducers } from 'redux';
import { SET_TOKEN, RESET_TOKEN } from '../actions';

// TOKEN REDUCER
const tokenReducer = (action: { type: string; payload: string }, state = '') => {
  if (action) {
    switch (action.type) {
      case SET_TOKEN:
        return action.payload;
      case RESET_TOKEN:
        return '';
      default:
        return state;
    }
  }
  return null;
};

// COMBINED REDUCERS
const reducers = {
  token: tokenReducer,
};

export default combineReducers(reducers);