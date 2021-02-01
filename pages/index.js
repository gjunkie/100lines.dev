import * as React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Blob1 from '../public/backgrounds/blob1.svg'
import Blob2 from '../public/backgrounds/blob2.svg'
import Blob3 from '../public/backgrounds/blob3.svg'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>100 Lines of Code</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div>
          <div className={styles.blobs}>
            <Blob2 />
            <Blob3 />
            <Blob2 />
            <Blob1 />
          </div>
          <h1 className={styles.title}>
            <span>100</span> Lines of Code
          </h1>
        </div>
        <p className={styles.description}>What can you do with 100 lines of code?</p>
      </header>

      <main className={styles.main}>
        <ul>
          <li>
            <h4>The Motivation</h4>
            <p>Learn and share at my own pace. With a family and a full time job I found it difficult to commit to larger projects. I needed a creative outlet that would allow quick bursts of creatvity.</p>
          </li>
          <li>
            <h4>The Constraints</h4>
            <p>Build something with 100 lines of code or less.</p>
          </li>
        </ul>
      </main>


      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
