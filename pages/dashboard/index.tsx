import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
//import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NUXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri: process.env.NUXT_PUBLIC_REDIRECT_URL
});

export default function Dashboard() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    const tokenMetadata = window.location.hash?.replace('#access_token=', '')
    const token = tokenMetadata.split('&')[0]
    router.push('/dashboard', undefined, { shallow: true })
    dispatch({ type: 'SET_TOKEN', payload: { token } })
  }, [dispatch])
  console.log(state)
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="The nest you never want to leave" />
      </Head>
      <main className={styles.main}>
        <p className={styles.description}>
          Let's see what we're working with
        </p>
      </main>
    </div>
  )
}
