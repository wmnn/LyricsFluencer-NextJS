import "./index.css";
import React, { useState } from "react";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Layout from '../components/Layout'
import UserContext from '../components/Context/UserContext'
import ResultSongsContext from '../components/Context/ResultSongsContext'
import type { AppProps } from 'next/app'
import SongContext from "../components/Context/SongContext";
import { SongContext as SongContextType } from "../types";
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
 
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const [userContext, setUserContext] = useState(null)
    const [resultSongsContext, setResultSongsContext] = useState<Array<any>>([])
    const [songContext, setSongContext] = useState<SongContextType>({isSongShown: false, lyrics: [], translation: [], song: null})
    
    if(Component.getLayout){
        return (
            <UserContext.Provider value={{userContext, setUserContext}}>
                {Component.getLayout(<Component {...pageProps} />)}
            </UserContext.Provider>
        )
    }

    return (
        <UserContext.Provider value={{userContext, setUserContext}}>
        <ResultSongsContext.Provider value={{resultSongsContext, setResultSongsContext}}>
            <SongContext.Provider value={{songContext, setSongContext}}>

            <Layout>
                <Component {...pageProps} />
            </Layout>

            </SongContext.Provider>
        </ResultSongsContext.Provider>
        </UserContext.Provider>
    )
  
};
export default MyApp;
