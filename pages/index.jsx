import React, {useEffect} from 'react'
import {auth} from "../src/util/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { Reasons, Explaination, KeyVisual } from '../components';
import { useRouter } from "next/router";
import Link from 'next/link';
import {root} from '../staticData'
import axios from 'axios'

function Index() {
  const router = useRouter()

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user){
        console.log("Logged in Request plan")

        // axios.get(root + `/payment/plan?token=${user.accessToken}`)
        // .then(function (json) {
        //   // handle success
        //   console.log(json);
        //   console.log("Checked Plan")
        //   json.data.subscriptionPlan == "free" ? router.push("/onboarding/plans") : router.push("/settings")
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })

        fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
         
        fetch(`/payment/plan?token=${user.accessToken}`)
          .then(res => res.json())
          .then(json => {
            console.log("Checked Plan")
            console.log(json)
            json.subscriptionPlan == "free" ? router.push("/onboarding/plans") : router.push("/settings")
        })
    }
    })
    return () => { //on Unmount this will be called
      listen();
    }   
      
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