import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers } from 'ethers'

const provider = ethers.providers.getDefaultProvider();

const ENS_REGEX = /\.eth$/

interface EnsData {
    ensName: string
    avatarUrl?: string
    address?: string
    email?: string
    url?: string
    twitterHandle?: string
}

export const useEns = (addressOrEns: string) => {
    const [lookupLoading, setLookupLoading] = useState(false);
    const [ensLoading, setEnsLoading] = useState(false);
    const [matchType, setMatchType] = useState<'address' | 'ens' | 'none'>('none');
    const [matchData, setMatchData] = useState<EnsData | null>(null);

    const fetchEnsData = useCallback(async (ensName: string) => {
        setEnsLoading(true)
        const ensResolver = await provider.getResolver(ensName)

        if (ensResolver) {
            const avatar = await ensResolver.getAvatar()
            const avatarUrl = avatar?.url
            const address = await ensResolver.getAddress()
            const email = await ensResolver.getText("email")
            const url = await ensResolver.getText("url")
            const twitterHandle = await ensResolver.getText("com.twitter")
    
            setMatchData({
                ensName,
                avatarUrl,
                address,
                email,
                url,
                twitterHandle,
            })

        } else {
            setMatchType('none')
        }
        setEnsLoading(false)
    },[])

    const lookupEns = useCallback(async (addressOrEns: string) => {
        setLookupLoading(true)
        const ensAddress = await provider.lookupAddress(addressOrEns)
        if (ensAddress) {
            await fetchEnsData(ensAddress)
        }
        setLookupLoading(false)
    },[])

    useEffect(() => {
        setMatchData(null)
        if (ethers.utils.isAddress(addressOrEns)) {
            setMatchType('address')
            lookupEns(addressOrEns)
        } else if (ENS_REGEX.test(addressOrEns)) {
            setMatchType('ens')
            fetchEnsData(addressOrEns)
        } else {
            setMatchType('none')
        }
    }, [addressOrEns])

    const loading = useMemo(() => lookupLoading || ensLoading, [lookupLoading, ensLoading])

    return { loading , matchType, matchData }
}