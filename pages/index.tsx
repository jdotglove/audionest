import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
const { SpotifyAuth, Scopes } = require('react-spotify-auth')

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
          redirectUri='http://localhost:3000/dashboard'
          clientID='ec0a0d1d51294ca1bb8cd91874e18cce'
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
        />
      </main>
    </div>
  )
}
