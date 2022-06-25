import { Box, LoadingIndicator, PageLayout, Text, ThemeProvider, DropdownMenu } from '@castle-studios/compound'
import styled from 'styled-components'
import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import {  useState } from 'react'
import { Input } from '~components/input'
import { useEns } from '~hooks/useEns'

import ethImage from './eth.png'

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
    },
  alchemy: process.env.ALCHEMY_API_KEY
});
// mainnetProvider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa").then((result: any) => {
//   console.log(result)
// });


//   mainnetProvider.resolveName('kitan.eth').then((result: any) => {
//     console.log(result)
//   });
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
  const [addr, setAddr] = useState('')
  const [domain, setDomain] = useState('')
  const [avatar, setAvatar] = useState('')

  const [openCard, setOpenCard] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const [isValidAddres, setIsValidAddress] = useState(false)

  const {  matchData, loading } = useEns(value)

  const findProfile:any = (search:string) => {
 
  var validSearch:boolean = false;

  if(search.toString().slice(-4) == ".eth"){
    mainnetProvider.resolveName(search.toString()).then((result: any) => {

     
      console.log("Address found: result: ", result)
      setAddr(result)
      setDomain(search)


        mainnetProvider.getAvatar(result).then((avt: any) => {
          validSearch = true
          setAvatar(avt)
          console.log(avt)
          setOpenCard(true)
        })
 
     
    });
  }else{
    mainnetProvider.lookupAddress(search).then((result: any) => {
      console.log(result)
      setAddr(searchInput)
      setDomain(result)
   
      mainnetProvider.getAvatar(result).then((avt: any) => {
        validSearch = true
        setAvatar(avt)
        console.log(avt)
        setOpenCard(true)
      })

    });
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
          <Input onChange={setSearchInput} value={searchInput} width="300px" placeholder="0x....."/>
        </Box>
        <SearchButton onClick={()=>findProfile(searchInput)} >Find Profile</SearchButton>



   


      <ProfileCard open={openCard}>
        <HeadSubline domain={domain} address={addr} />
        <ProfileCardImageContainer >
        <ProfileCardImage src={avatar}/>
        </ProfileCardImageContainer>
        <ProfileCardDescription>
        </ProfileCardDescription>
      </ProfileCard>



        
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
const ENSlookup = styled.div`
 background: black;
 width:100%;
 min-height:100vh;
 displa


`
const Searchbar = styled.div`
 background: purple;
 width:400px;
 heigh:20px;
 margin:auto;
 display:flex;
 justify-content:center;

`

const Searchfield = styled.input`
  display:block;
  background-color: aqua;
  color:red;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  padding: 5px 10px;
  background: url("http://kodyrabatowe.wp.pl/img/ico/search_gr.png") top left     no-repeat;
  height:30px;
  padding-left:25px;
  border: solid black 2px;
  outline: 0;
  &:focus {
    border: solid red 4px;
  }
}
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


const ProfileCardImageContainer = styled.div`{

  
  height:60%;
  width: 100%;
  max-width: 100%;
  display:flex;
  align-items:center;
  justify-content:center;

  background-color:white;



}
`


const ProfileCardImage = styled.img`{

  max-height:100%;
  max-width:90%;
  background-color:blue;
}
`


const ProfileCardDescription = styled.div`{
  backgrund-color:grey;
  max-height:100%;
  max-width:100%;
  background-color:blue;
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
