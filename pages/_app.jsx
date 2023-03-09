import "./index.css";
import React, { useState } from "react";
import Layout from '../components/Layout'
import UserContext from '../components/Context/UserContext'


const MyApp = ({ Component, pageProps }) => {
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
