import React, {useEffect, useState, useContext} from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import {auth} from "../../src/util/firebase";
import { signOut } from 'firebase/auth'
import UserContext from '../../components/Context/UserContext.jsx'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function Setup() {
    const router = useRouter()
    const [plan, setPlan] = useState(null)
    const {userContext, setUserContext} = useContext(UserContext);

    const handlePlan = () => {
        var plan = getParameterByName('plan');
        if (plan == "basic"){
            setPlan(plan)
        }else if (plan == "premium"){
            setPlan(plan)
        }else{
        }
    }
    function getParameterByName( name ){
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( window.location.href );
        if( results == null )
          return "";
        else
          return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    useEffect(() => {
        handlePlan()        
    }, [])
    // useEffect(() => {
    //     const listen = onAuthStateChanged(auth, (user) => {
    //         if (user){
    //             setUserContext(user)
    //             console.log(user.accessToken)
    //         }else{
    //             //setUserContext(null);
    //             //router.push("/")
    //         }
    //     })
    //         return () => { //on Unmount this will be called
    //             listen();
    //         }
    //     }, []);

   
        const createSubscription = (data, actions) => {
            return actions.subscription.create({
                plan_id: 'P-7DE34418UA5971527MO4ITGY'
            });
        };
         
        const onApprove = async (data, detail) => {
            console.log("Paypal approved the subscription.")
            console.log(data.subscriptionID)
            console.log(plan)
            var token

            await onAuthStateChanged(auth, (user) => {
                if (user){
                    token = user.accessToken
                }else{
                    console.log("else")
                }
            })
            window.location.href = 'http://localhost:8080/payment/capture/paypal?subscriptionId=' + data.subscriptionID + "&token=" + token + "&plan=" + plan
        };
        const onError = (e) => {
            console.log(e)
        }

  return (
    <div className='flex flex-col items-center w-[100%] h-screen justify-around'>
        <div className='text-2xl px-8'>

            <h1 className='text-4xl font-bold mb-4'>Premium Plan</h1>
            <ul className='w-[100%]'>
            <li>• Unlimited Requests</li>
            <li>• Quick Search Songs</li>
            <li>• Translate Lyrics</li>
            <li>• Google the Meaning</li>
            <li>• Flashcard decks</li>
            <li>• Shazam Song Recognition</li>
            </ul>
            <p className='text-2xl p-4'>14 Days Free, afterwards 39.99€/ Monat</p>

        </div>        
            
        
        <div className='w-[80%] flex flex-col items-center'>
        
        {/* <div id="paypal-button-container" className='mt-4 w-[80%] md:w-[50%] flex justify-center'> */}
            <PayPalScriptProvider options={{ 
                "client-id": "AZ9o0Oe4uSwML7Jo9gg4EVWVLlFlAY2GC1m4jIxDesk03HszG56ASLpY5drp1t9LvZaWZYmlO1ekOhRc",
                components: "buttons",
				intent: "subscription",
				vault: true,
            }}>
                
                    <PayPalButtons
                        className='w-[100%] flex justify-center'
                        createSubscription={createSubscription}
                        onApprove={onApprove}
                        onError={onError}
                    />
            </PayPalScriptProvider> 
        {/* </div> */}
        {/* {
                plan === "basic" ? <> 
                    <Link className="text-2xl" href="/signup/setup?plan=premium" onClick={() => setPlan("premium")}>or Switch to Premium</Link>
                </> : <>
                    <Link className="text-2xl" href="/signup/setup?plan=basic" onClick={() => setPlan("basic")}>or Switch to Basic</Link>
                </>
        } */}
        
        </div>


    </div>
  )
}

export default Setup

Setup.getLayout = function PageLayout(page){
	return(
		<>
        <Header />
		{page}
		</>
    )
}


const Header = () => {
    const router = useRouter()

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed user out')
            router.push("/")
            
        }).catch(error => console.log(error))
    }
    return (
        <div className='w-[100%] h-12 md:h-16 flex justify-end items-center '>
            <p className='text-xl hover:cursor-pointer mr-8 md:mr-16' onClick={() => userSignOut()}>Logout</p>
        </div>
    )
}