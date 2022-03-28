import '../styles/globals.css'

import { Provider } from 'react-redux'
import SpotifyProvider from '../src/providers/SpotifyProvider'
import { useStore } from '../store'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AudioNestApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={ store }>
        <SpotifyProvider>
          <Component props={ pageProps } />
        </SpotifyProvider>
    </Provider>
  )
}
