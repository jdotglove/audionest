import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import SpotifyProvider from '../src/SpotifyProvider'

export default function AudioNestApp({ Component, pageProps }: AppProps) {
  return (
    <SpotifyProvider>
      <Component {...pageProps} />
    </SpotifyProvider>
  )
}
