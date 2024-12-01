import './index.css';
import React from "react";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import DefaultLayout from '../components/layout/DefaultLayout'
import { UserContextProvider } from '../components/context/UserContext'
import { ResultSongsContextProvider } from '../components/context/ResultSongsContext'
import type { AppProps } from 'next/app'
import { SongContextProvider } from "../components/context/SongContext";
import { DeckContextProvider } from "../components/context/DeckContext";
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
 
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {

    return (
        <UserContextProvider>
            <ResultSongsContextProvider>
                <SongContextProvider>
                    <DeckContextProvider>   

                        {
                            Component.getLayout ? (    
                                Component.getLayout(<Component {...pageProps} />)
                            ): <DefaultLayout>
                                <Component {...pageProps} />
                            </DefaultLayout>                        
                        }

                    </DeckContextProvider>
                </SongContextProvider>
            </ResultSongsContextProvider>
        </UserContextProvider>
    )
  
};
export default MyApp;
