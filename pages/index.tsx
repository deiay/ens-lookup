import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { ethers } from "ethers";
import { useEffect } from 'react'
import { useState } from 'react'
//import ENS from "ethereum-ens";
// ENS functionality is provided directly on the core provider object.

// Use the mainnet
const network = "homestead";
const mainnetProvider = ethers.getDefaultProvider(network, {
  infura: {
       projectId: "52aa216f11be4aee86232787a4f4f7a2",
       projectSecret: "812406e38cdb416aa2d45291bb7dfdd9",
    }
});
mainnetProvider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa").then((result: any) => {
  console.log(result)
});


  mainnetProvider.resolveName('kitan.eth').then((result: any) => {
    console.log(result)
  });
// const lookupAddr = async () =>{

//   mainnetProvider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa").then((result: any) => {
//     console.log(result)
//   });

//   mainnetProvider.lookupAddress('ricmoo.eth').then((result: any) => {
//     console.log(result)
//   });

// }

const Home: NextPage = () => {


 useEffect(() => {
 

    //connectWalletOnPageLoad()
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Ens Lookup</title>
        <meta name="description" content="Ens lookup" />        
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
