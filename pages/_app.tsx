import Head from "next/head";
import { Provider } from "react-redux";

import "../styles/globals.css";
import store from "../store";
import SpotifyProvider from "../src/providers/SpotifyProvider";
import ThemeColors from "../src/ThemeColors";
import "../styles/scss/index.scss";
import ChartProvider from "../src/providers/ChartProvider";
import FontProvider from "../src/providers/FontProvider";
import PlaylistProvider from "../src/providers/PlaylistProvider";

export default function AudioNestApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <SpotifyProvider>
        <PlaylistProvider>
          <ChartProvider>
            <ThemeColors>
              <FontProvider>
                <Head>
                  <title>AudioNest</title>
                  <meta
                    name="description"
                    content="The nest you never want to leave"
                  />
                </Head>
                <Component props={pageProps} />
              </FontProvider>
            </ThemeColors>
          </ChartProvider>
        </PlaylistProvider>
      </SpotifyProvider>
    </Provider>
  );
}
