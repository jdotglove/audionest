import Head from 'next/head';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import SpotifyProvider from '../src/providers/SpotifyProvider';
import { useStore } from '../store';
import ThemeColors from '../src/ThemeColors';
import '../styles/scss/index.scss';
import PlaylistProvider from '../src/providers/PlaylistProvider';
import ChartProvider from '../src/providers/ChartProvider';
import FontProvider from '../src/providers/FontProvider';

export default function AudioNestApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={ store }>
      <SpotifyProvider>
        <PlaylistProvider>
          <ChartProvider>
            <ThemeColors>
              <FontProvider>
                <Head>
                  <title>AudioNest</title>
                  <meta name='description' content='The nest you never want to leave' />
                </Head>
                <Component props={ pageProps } />
              </FontProvider>
            </ThemeColors>
          </ChartProvider>
        </PlaylistProvider>
      </SpotifyProvider>
    </Provider>
  );
}
