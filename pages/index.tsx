import Head from 'next/head';
import styles from '../styles/Home.module.css';

const { SpotifyAuth, Scopes } = require('react-spotify-auth');

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AudioNest</title>
        <meta name="description" content="The nest you never want to leave" />
      </Head>
      <main className={styles.main}>
        <h1> Welcome to AudioNest </h1>
        <p className={styles.description}>
          The nest you never want to leave...
        </p>
        <SpotifyAuth
          redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL}
          clientID={process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID}
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
        />
      </main>
    </div>
  );
}
