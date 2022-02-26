import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie'
var { SpotifyAuth, Scopes } = require('react-spotify-auth')
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.NUXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri: process.env.NUXT_PUBLIC_REDIRECT_URL
});

export default function Home() {

  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))
  console.log(process.env.NUXT_PUBLIC_REDIRECT_URL)
  console.log(token)
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
          redirectUri='http://localhost:3000/dashboard'
          clientID='ec0a0d1d51294ca1bb8cd91874e18cce'
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
          onAccessToken={(token) => Cookies.set("spotifyAuthToken", token)(setToken(token))}
        />
      </main>
    </div>
  )
}
