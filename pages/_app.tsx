import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import SpotifyProvider from '../src/SpotifyProvider'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AudioNestApp({ Component, pageProps }: AppProps) {
  return (
    <SpotifyProvider>
      <Component {...pageProps} />
    </SpotifyProvider>
  )
}
