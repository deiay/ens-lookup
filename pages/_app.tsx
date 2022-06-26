import '../styles/theme.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@castle-studios/compound'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider:any) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
            <Web3ReactProvider getLibrary={getLibrary}>

      <Component {...pageProps} />
      </Web3ReactProvider>

    </ThemeProvider>
  )
}

export default MyApp
