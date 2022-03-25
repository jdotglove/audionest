import { combineReducers } from 'redux'
import { SET_TOKEN, RESET_TOKEN } from '../actions'

// TOKEN REDUCER
const tokenReducer = (state = '', { action, payload }) => {
  switch (action) {
    case SET_TOKEN:
      return payload.token
    case RESET_TOKEN:
      return ''
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  token: tokenReducer,
}

export default combineReducers(reducers)