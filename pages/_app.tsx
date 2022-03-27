import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import SpotifyProvider from '../src/SpotifyProvider'
import ThemeColors from '../src/ThemeColors'
import '../styles/scss/index.scss'


export default function AudioNestApp({ Component, pageProps }: AppProps) {
  return (
    <SpotifyProvider>
      <ThemeColors>
        <Component {...pageProps} />
      </ThemeColors>
    </SpotifyProvider>
  )
}
