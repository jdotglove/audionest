import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalState from "../src/contexts/GlobalState";
import reducer from "../store/reducers"
import { initialState } from '../store';

import React, { useReducer } from 'react'
import SpotifyProvider from '../src/providers/SpotifyProvider'
import { Provider } from 'react-redux'
import { useStore } from '../store'

export default function AudioNestApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider store={ store }>
      <GlobalState initialState={state} dispatch={dispatch}>
        <SpotifyProvider>
          <Component {...pageProps} />
        </SpotifyProvider>
      </GlobalState>
    </Provider>
  )
}
