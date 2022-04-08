import '../styles/globals.css';

import { Provider } from 'react-redux';
import SpotifyProvider from '../src/providers/SpotifyProvider';
import { useStore } from '../store';
import ThemeColors from '../src/ThemeColors';
import '../styles/scss/index.scss';

export default function AudioNestApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <SpotifyProvider>
        <ThemeColors>
          <Component props={pageProps} />
        </ThemeColors>
      </SpotifyProvider>
    </Provider>
  );
}
