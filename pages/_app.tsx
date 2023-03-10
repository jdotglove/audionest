import '../styles/globals.css';

import { Provider } from 'react-redux';
import SpotifyProvider from '../src/providers/SpotifyProvider';
import { useStore } from '../store';
import ThemeColors from '../src/ThemeColors';
import '../styles/scss/index.scss';
import PlaylistProvider from '../src/providers/PlaylistProvider';
import ChartProvider from '../src/providers/ChartProvider';
import RecommendationProvider from '../src/providers/RecommendationProvider';

export default function AudioNestApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <SpotifyProvider>
        <PlaylistProvider>
          <ChartProvider>
            <RecommendationProvider>
              <ThemeColors>
                <Component props={pageProps} />
              </ThemeColors>
            </RecommendationProvider>
          </ChartProvider>
        </PlaylistProvider>
      </SpotifyProvider>
    </Provider>
  );
}
