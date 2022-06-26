import { Box, LoadingIndicator, PageLayout, Text, ThemeProvider} from '@castle-studios/compound'
import styled from 'styled-components'
import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import {  useState } from 'react'
import { Input } from '~components/input'
import { useEns } from '~hooks/useEns'
import { ethers } from "ethers";


import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import {ENS, InternalENS} from '@ensdomains/ensjs'

var Web3 = require("web3")


export const providerOptions = {

  walletconnect: {
    package: WalletConnectProvider, 
    
    options: {
      infuraId: "812406e38cdb416aa2d45291bb7dfdd9"
    }
  }
};

const web3Modal = typeof window === "object" ? new Web3Modal({network: 'homestead', providerOptions }) : undefined;



// Use the mainnet
const network = "homestead";
const mainnetProvider = ethers.getDefaultProvider(network, {
  infura: {
       projectId: "52aa216f11be4aee86232787a4f4f7a2",
       projectSecret: "812406e38cdb416aa2d45291bb7dfdd9",
    },
  alchemy: process.env.ALCHEMY_API_KEY
});

console.log(network)





const Home: NextPage = () => {
  const [value, setValue] = useState('')
  const [provider, setProvider] = useState(null);
  const [library, setLibrary] = useState(null);

  const {  matchData, loading } = useEns(value)

  


  

  const connectWallet:any = async () => {

    // const provider = new WalletConnectProvider({
    //     infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    //   });
    
    //     Enable session (triggers QR Code modal)
    //   await provider.enable();
    //   setProvider(providers.Web3Provider(provider));


  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();


    setProvider(provider);
    setLibrary(library);
  } catch (error) {
    console.error(error);
  }
    
}




  return (
    <ThemeProvider>
      <Head>
        <title>Ens Lookup</title>
        <meta name="description" content="Ens lookup" />        
      </Head>
      <PageLayout minHeight='100vh'>
      <FullHeightBox spacing={["pt4"]} stacked="column" justify="center" align="center">
        <Box>
          <Text  align="center" bold>Enter an address or domain name</Text>
          <Input onChange={setValue} value={value} width="300px" placeholder="0x....."/>
        </Box>

      <ProfileCard open={matchData}>
 
        <HeadSubline domain={matchData? matchData.ensName:""} address ={matchData? matchData.address:""} />
        <ProfileCardImageContainer >
        <ProfileCardImage src={matchData? matchData.avatarUrl:""}/>
        </ProfileCardImageContainer>
        <ProfileCardDescription>
          <InfoCard >{matchData && matchData.email && matchData.email}</InfoCard>
          <InfoCard>{matchData && matchData.twitterHandle && matchData.twitterHandle}</InfoCard>
          <InfoCard>{matchData && matchData.url && matchData.url}</InfoCard>
    

        </ProfileCardDescription>

        <EditProfileButton  open={matchData} onClick={ connectWallet }>edit</EditProfileButton>

      </ProfileCard>



{/*         
        <LoadingIndicator ready={!loading}>
          {matchData && (Object.keys(matchData) as (keyof typeof matchData)[]).map((key) => {
            const data = matchData[key]
            return data && <Text>{`${key}: ${data}`}</Text>
          })}
        </LoadingIndicator> */}
      </FullHeightBox>
      </PageLayout>
    </ThemeProvider>      
  )
}

export default Home

const FullHeightBox = styled(Box)`
  height: 100vh;
`


const InfoCard = styled.p<{show?:any}>`
 padding:4px;
 margin:0;
 font-weight:200;
 ${props => props.edit ? "border: solid 1px red" : ""}


`

const ProfileCard = styled.div<{
  open?:boolean

}>`{
  background: white;
  color: black;
  border-radius: 8px;
  width: 400px;
  height:400px;
  display:flex;


  margin:auto;
  padding:6px;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  border-radius:18px;
  -webkit-box-shadow: 10px 10px 101px -19px rgba(255,255,255,0.9);
  -moz-box-shadow: 10px 10px 101px -19px rgba(255,255,255,0.9);
  box-shadow: 10px 10px 101px -19px rgba(255,255,255,0.9);
  

  height: ${props => props.open ? "60%" : "0%"};

  transition: all 0.3s ease-out;


  

}
`
const styles = {
  HeadSubline: {
      display: 'block',
      width:"100%",
      height:"auto",
      textAlign:"center",
      headline:{
        padding:0,
        margin:0,
        color: "black",
        fontWeight:"800",
        fontSize: "28px"
      },
      subline:{
        margin:0,
        padding:0,
        fontWeight:"200",
        fontSize: "12px"
        

      }
  },
}
const HeadSubline = ({ domain, address }: { domain: string, address: string,  }) => {
  return (
  <div style ={styles.HeadSubline}>
    <p style ={styles.HeadSubline.headline}>{domain}</p>
    <p style={styles.HeadSubline.subline}>{address}</p>
  </div>
  )

};


const ProfileCardImageContainer = styled.div<{edit?:boolean}>`{

  
  height:60%;
  width: 90%;
  max-width: 90%;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:white;

  ${props => props.edit ? "border: solid 1px red" : ""}


}
`


const ProfileCardImage = styled.img`{

  max-height:90%;
  max-width:100%;
  background-color:blue;



}
`


const ProfileCardDescription = styled.div`{

  width:100%;
  text-align: center;

}
`

const SearchButton = styled.button`{

  padding: 6px 10px;
  margin-top: 8px;
  background-color:black;
	border: 1px solid white;
  border-radius: 8px;
  color: white;

}
`
const EditProfileButton = styled.a<{open:boolean}>`
  decoration:none;
  color:black;
  border: solid 1px black;
  border-radius: 8px;
  padding: 4px 8px;
  font-size:12px;
  ${props => props.open ? "" : "display:none"};
  &:hover{
    cursor: pointer;
    color: white;
    background-color:black;
  }
`