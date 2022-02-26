import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const state = useSelector((state) => state)
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
