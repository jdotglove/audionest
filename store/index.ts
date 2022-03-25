import { useMemo } from 'react'
import { createStore, applyMiddleware, AnyAction, EmptyObject, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { SpotifyAPI } from '../types'
import reducers from './reducers'
import { useAudioNestDispatch } from './hook'

let store: Store<EmptyObject & AudioNestRootState, AnyAction> & { 
  dispatch: unknown
}

function initStore(initialState: { token?: any }) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export type AudioNestRootState = {
  token: string,
}

export const initialState = {
  token: ''
}

export type AudioNestDispatch = typeof store.dispatch

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}