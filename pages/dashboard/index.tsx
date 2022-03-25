import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
//import Cookies from 'js-cookie'

import { useAudioNestDispatch, useAudioNestSelector } from '../../store/hook'
import styles from '../../styles/Home.module.css'

const SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_AUDIONEST_CLIENT_ID,
  clientSecret: process.env.AUDIONEST_SECRET_ID,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL
});

export default function Dashboard() {
  const state = useAudioNestSelector((state) => state)
  const dispatch = useAudioNestDispatch()
  const router = useRouter()
  const { user } = state
  useEffect(() => {
    const tokenMetadata = window.location.hash?.replace('#access_token=', '')
    const token = tokenMetadata.split('&')[0]
    router.push('/dashboard', undefined, { shallow: true })
    dispatch({ type: 'SET_TOKEN', payload: { token } })
    spotifyApi.setAccessToken(`${token}`);
    // Get the authenticated user
    try {
      spotifyApi.getMe()
      .then(async function(response: { body: any }) {
        console.log('Some information about the authenticated user', response.body);
        dispatch({ type: 'SET_CURRENT_USER', 
          payload: { 
            user: { 
              ...response.body 
            }
          } 
        })
      }, function(err: any) {
        throw new Error(err);
      })
      .finally(async function() {
        // Get a user's playlists
        await spotifyApi.getUserPlaylists(user.id)
        .then(function(data: { body: any }) {
          console.log('Retrieved playlists', data.body);
          dispatch({ type: 'SET_USER_PLAYLISTS', 
          payload: { 
            playlists: { 
              ...data.body 
            } 
          } 
        })
        },function(err: any) {
          console.log('Something went wrong!', err);
        });
      })
    } catch (error) {
      console.error('Something went wrong', error)
    }
  }, [dispatch])
  console.log('Outside Use Effect', state)
  if (!user) {
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
  } else {
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
          <p>
            {user.display_name}
          </p>
          <p>

          </p>
          </main>
      </div>
    )
  }
  
}
