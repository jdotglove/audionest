import { combineReducers } from 'redux'
import * as types from '../../types'

// TOKEN REDUCER
const tokenReducer = (state = '', { type, payload }) => {
  switch (type) {
    case types.SET_TOKEN:
      return payload.token
    case types.RESET_TOKEN:
      return ''
    default:
      return state
  }
}
// COMBINED REDUCERS
const reducers = {
  token: tokenReducer
}

export default combineReducers(reducers)