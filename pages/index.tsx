import { Box, LoadingIndicator, PageLayout, Text, ThemeProvider } from '@castle-studios/compound'
import styled from 'styled-components'
import type { NextPage } from 'next'
import Head from 'next/head'
import {  useState } from 'react'
import { Input } from '~components/input'
import { useEns } from '~hooks/useEns'

import { ethers } from "ethers";
import { useEffect } from 'react'
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
  const [value, setValue] = useState('')
  const [isValidAddres, setIsValidAddress] = useState(false)

  const {  matchData, loading } = useEns(value)

  return (
    <ThemeProvider>
      <Head>
        <title>Ens Lookup</title>
        <meta name="description" content="Ens lookup" />        
      </Head>
      <PageLayout minHeight='100vh'>
      <FullHeightBox stacked="column" justify="center" align="center">
        <Box>
          <Text bold>Enter your wallet address</Text>
          <Input onChange={setValue} value={value} width="300px" placeholder="0x....."/>
        </Box>
        <LoadingIndicator ready={!loading}>
          {matchData && (Object.keys(matchData) as (keyof typeof matchData)[]).map((key) => {
            const data = matchData[key]
            return data && <Text>{`${key}: ${data}`}</Text>
          })}
        </LoadingIndicator>
      </FullHeightBox>
      </PageLayout>
    </ThemeProvider>      
  )
}

export default Home

const FullHeightBox = styled(Box)`
  height: 100vh;
`