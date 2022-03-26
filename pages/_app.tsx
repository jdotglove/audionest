import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import SpotifyProvider from '../src/providers/SpotifyProvider'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AudioNestApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={ store }>
        <SpotifyProvider>
          <Component {...pageProps} />
        </SpotifyProvider>
    </Provider>
  )
}
