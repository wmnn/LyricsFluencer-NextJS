import React, {useEffect} from 'react'
import {auth} from "../src/util/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { Reasons, Explaination, KeyVisual } from '../components';
import { useRouter } from "next/router";
import Link from 'next/link';

function Index() {
  const router = useRouter()

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user){
        //window.location.href = 'http://localhost:8080/payment/plan' + "?token=" + user.accessToken
        fetch("/payment/plan?token=" + user.accessToken, {
          method: "GET", 
          //headers: { "Content-Type" : "application/json" },
          //body: JSON.stringify({ name: "User 1"}),
        })
        .then( res => res.json() )
        .then( data => {
          console.log(data)
          data.subscriptionPlan == "free" ? router.push("/onboarding/plans") : router.push("/settings")
        })
      }
    })
      
    }, []);
  return (
    <>
      <KeyVisual />
      <Reasons />
      <Explaination />     
    </>
  )
}

export default Index


Index.getLayout = function PageLayout(page){
	return(
		<>
		{page}
    <div className='flex justify-center space-x-8 h-8 mt-24 mb-4'>
        {/* <Link href="/imprint">Imprint</Link> */}
        <Link href="/terms">Terms and Conditions</Link>
        <Link href="/privacy">Privacy Policy</Link>
    </div>
		</>
	)
}