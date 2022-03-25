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

// USER REDUCER
const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_USER:
      return payload.user
    case types.SET_USER_PLAYLISTS:
      return payload.playlists
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  token: tokenReducer,
  user: userReducer
}

export default combineReducers(reducers)