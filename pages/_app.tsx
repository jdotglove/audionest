import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import SpotifyProvider from '../src/providers/SpotifyProvider'
import { Provider } from 'react-redux'
import { useStore } from '../store'

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
