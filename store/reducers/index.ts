import { combineReducers } from 'redux'
import { SET_TOKEN, RESET_TOKEN } from '../actions'

// TOKEN REDUCER
const tokenReducer = (state = '', { type, payload }) => {
  console.log(type, payload)
  switch (type) {
    case SET_TOKEN:
      console.log('here')
      return payload
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