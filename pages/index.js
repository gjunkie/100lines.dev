import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Blob1 from '../public/backgrounds/blob1.svg'
import Blob2 from '../public/backgrounds/blob2.svg'
import Blob3 from '../public/backgrounds/blob3.svg'

import Snake from '../projects/games/snake'

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
      </header>

      <main className={styles.main}>
        <ul>
          <li>
            <h4>The Motivation</h4>
            <p>To learn and share at my own pace. This is a creative outlet that allows for creatvity to flow without time constraints.</p>
          </li>
          <li>
            <h4>The Constraints</h4>
            <p>Build something with 100 lines of code or less. That&apos;s it. Each project is a self-contained React component.</p>
          </li>
        </ul>
        <Link href="/projects" as="/projects">Check out all of the projects ...</Link>
        <h3>Snake</h3>
        <Snake />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
