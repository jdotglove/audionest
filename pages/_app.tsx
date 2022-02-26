import '../styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { useStore } from '../store'

export default function AudioNestApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
