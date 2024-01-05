// import React, {useEffect, useState, useContext} from 'react'
// import Link from 'next/link'
// import { useRouter } from "next/router";
// import {auth} from "../../src/util/firebase";
// import { signOut } from 'firebase/auth'
// import { onAuthStateChanged } from 'firebase/auth'
// import UserContext from '../../components/Context/UserContext.jsx'
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// //import PremiumPlanDescription from '../../components/PremiumPlanDescription';
// import { paypal_client_id, paypal_plan_id } from '../../staticData';


// function Setup() {
//     const router = useRouter()
//     const { userContext, setUserContext } = useContext(UserContext);

//     const handleStripePayment = async () => {
//         var token
//         await onAuthStateChanged(auth, (user) => {
//                 if (user){
//                     token = user.accessToken
//                 }else{
//                     console.log("Not logged in")
//                     return
//                 }
//         })
//         window.location = `/payment/stripe?token=${token}`
//     }

//     useEffect(() => {
//         //handlePlan()   
//         const listen = onAuthStateChanged(auth, (user) => {
//             if (user){
//                 setUserContext(user)
//                 console.log(user.accessToken)
//             }else{
//                 setUserContext(null);
//                 router.push("/")
//             }
//         })
//             return () => { //on Unmount this will be called
//                 listen();
//             }     
//     }, [])


   
//         const createSubscription = (data, actions) => {
//             return actions.subscription.create({
//                 plan_id: paypal_plan_id
//             });
//         };
         
//         const onApprove = async (data, detail) => {
//             console.log("Paypal approved the subscription.")
//             console.log(data.subscriptionID)
//             var token

//             await onAuthStateChanged(auth, (user) => {
//                 if (user){
//                     token = user.accessToken
//                 }else{
//                     console.log("else")
//                 }
//             })
//             //!!!
//             window.location.href = '/payment/capture/paypal?subscriptionId=' + data.subscriptionID + "&token=" + token
//         };
//         const onError = (e) => {
//             console.log(e)
//         }

//   return (
//     <div className='flex flex-col items-center w-[100%] h-screen justify-around'>
//         <div className='text-2xl px-8 mt-8'>

//             <h1 className='text-4xl font-bold mb-4'>Premium Plan</h1>
//             <PremiumPlanDescription />

//         </div>        
            
        
//         <div className='w-[80%] flex flex-col items-center'>
        
//         {/* <div id="paypal-button-container" className='mt-4 w-[80%] md:w-[50%] flex justify-center'> */}
//             <PayPalScriptProvider options={{ 
//                 "client-id": paypal_client_id,
//                 components: "buttons",
// 				intent: "subscription",
// 				vault: true,
//             }}>
                    
//                     <PayPalButtons
//                         className='w-[100%] flex justify-center transition-all'
//                         createSubscription={createSubscription}
//                         onApprove={onApprove}
//                         onError={onError}
//                     />

//                     {/* <div className='bg-black w-full h-[55px] hover:opacity-80 hover:cursor-pointer rounded  transition-all flex justify-center items-center mt-4 max-w-[750px]' onClick={() => handleStripePayment()}>
//                         <p className='text-white text-2xl'>Secure Checkout</p>
//                     </div>
//                     <div className='flex justify-center items-center mt-4'>
//                             <img src={'/images/paymentIcons/Stripe.svg'} className="object-contain w-16 h-8"/>
//                             <img src={'/images/paymentIcons/AmericanExpress.png'} className="object-contain w-16 h-8"/>
//                             <img src={'/images/paymentIcons/mastercard.png'} className="object-contain h-10 w-14 rounded p-2 border-gray-300"/>
//                             <img src={'/images/paymentIcons/visa.png'} className="object-contain w-16 h-4"/>
//                         </div> */}
                    
//             </PayPalScriptProvider> 
            
//         {/* </div> */}
//         {/* {
//                 plan === "basic" ? <> 
//                     <Link className="text-2xl" href="/signup/setup?plan=premium" onClick={() => setPlan("premium")}>or Switch to Premium</Link>
//                 </> : <>
//                     <Link className="text-2xl" href="/signup/setup?plan=basic" onClick={() => setPlan("basic")}>or Switch to Basic</Link>
//                 </>
//         } */}
        
        
//         </div>


//     </div>
//   )
// }

// export default Setup

// Setup.getLayout = function PageLayout(page){
// 	return(
// 		<>
//         <Header />
// 		{page}
//         <div className='flex justify-center space-x-8 h-8 mt-24 mb-4'>
//         <Link href="/terms">Terms and Conditions</Link>
//         <Link href="/privacy">Privacy Policy</Link>
//     </div>
// 		</>
//     )
// }


// const Header = () => {
//     const router = useRouter()

//     const userSignOut = () => {
//         signOut(auth).then(() => {
//             console.log('Signed user out')
//             router.push("/")
            
//         }).catch(error => console.log(error))
//     }
//     return (
//         <div className='w-[100%] h-12 md:h-16 flex justify-end items-center '>
//             <p className='text-xl hover:cursor-pointer mr-8 md:mr-16' onClick={() => router.push("/settings")}>Settings</p>
//             <p className='text-xl hover:cursor-pointer mr-8 md:mr-16' onClick={() => userSignOut()}>Logout</p>
//         </div>
//     )
// }