import '../styles/globals.css';

import { Provider } from 'react-redux';
import SpotifyProvider from '../src/providers/SpotifyProvider';
import { useStore } from '../store';
import ThemeColors from '../src/ThemeColors';
import '../styles/scss/index.scss';
import PlaylistProvider from '../src/providers/PlaylistProvider';
import TrackProvider from '../src/providers/TrackProvider';

export default function AudioNestApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={ store }>
      <SpotifyProvider>
        <PlaylistProvider>
          <TrackProvider>
            <ThemeColors>
              <Component props={ pageProps } />
            </ThemeColors>
          </TrackProvider>
        </PlaylistProvider>
      </SpotifyProvider>
    </Provider>
  );
}
