import { Box, LoadingIndicator, PageLayout, Text, ThemeProvider } from '@castle-studios/compound'
import styled from 'styled-components'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '~components/input'
import { useEns } from '~hooks/useEns'
import { ethers } from 'ethers'

const provider = ethers.providers.getDefaultProvider();

const Home: NextPage = () => {
  const [value, setValue] = useState('')
  const [isValidAddres, setIsValidAddress] = useState(false)

  const { matchType, matchData, loading } = useEns(value)


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
          {`${JSON.stringify(matchData)} ${matchType}`}
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