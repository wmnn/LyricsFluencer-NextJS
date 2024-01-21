import "./index.css";
import React, { useState } from "react";
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Layout from '../lib/components/Layout'
import UserContext from '../lib/components/Context/UserContext'
import type { AppProps } from 'next/app'
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [userContext, setUserContext] = useState(null)
  
  if(Component.getLayout){
    return (
      <UserContext.Provider value={{userContext, setUserContext}}>
        {Component.getLayout(<Component {...pageProps} />)}
      </UserContext.Provider>
    )
  }
  return (
    <UserContext.Provider value={{userContext, setUserContext}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
  
};
export default MyApp;
