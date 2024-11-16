import "./index.css";
import React, { useState } from "react";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Layout from '../components/Index/Layout'
import { UserContextProvider } from '../components/context/UserContext'
import ResultSongsContext from '../components/context/ResultSongsContext'
import type { AppProps } from 'next/app'
import SongContext from "../components/context/SongContext";
import { SongContext as SongContextType } from "../components/types";
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
 
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const [resultSongsContext, setResultSongsContext] = useState<Array<any>>([])
    const [songContext, setSongContext] = useState<SongContextType>({isSongShown: false, lyrics: [], translation: [], song: null})
    
    if(Component.getLayout) {
        return (
            <UserContextProvider>
                {Component.getLayout(<Component {...pageProps} />)}
            </UserContextProvider>
        )
    }

    return (
        <UserContextProvider>
            <ResultSongsContext.Provider value={{resultSongsContext, setResultSongsContext}}>
                <SongContext.Provider value={{songContext, setSongContext}}>

                <Layout>
                    <Component {...pageProps} />
                </Layout>

                </SongContext.Provider>
            </ResultSongsContext.Provider>
        </UserContextProvider>
    )
  
};
export default MyApp;
