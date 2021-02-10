import * as React from 'react'
import Head from 'next/head'

import Snake from '../../../../projects/games/snake'

export default function SnakePage() {
  return (
    <React.Fragment>
      <Head>
        <title>100 Lines of Code - Snake</title>
      </Head>
      <header>
        <h1>Snake</h1>
      </header>
      <Snake />
    </React.Fragment>
  )
}
