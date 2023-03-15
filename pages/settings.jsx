import React, {useState, useEffect} from 'react'
import CancelModal from '../components/Settings/CancelModal'
import CancelSubscriptionModal from '../components/Settings/CancelSubscriptionModal';
import Button from '../components/Button'
import {auth} from "../src/util/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/router";
import {root} from '../staticData'
import axios from 'axios'

function Settings() {
  const [plan, setPlan] = useState("") 
  const [subscriptionStatus, setSubscriptionStatus] = useState("")
  const router = useRouter()
  const [isCancelClicked, setIsCancelClicked] = useState(false)
  const [isDeleteAccountClicked, setIsDeleteAccountClicked] = useState(false)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user){
        /*
        axios.get(root + `/payment/plan?token=${user.accessToken}`)
        .then(function (json) {
          // handle success
          console.log(json.data)
            setPlan(json.data.subscriptionPlan)
            setSubscriptionStatus(json.data.subscriptionStatus)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })*/
        fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
        fetch(`http://localhost:8080/payment/plan?token=${user.accessToken}`)
          .then(res => res.json())
          .then(json => {
            console.log("Checked Plan")
            setPlan(json.subscriptionPlan)
            setSubscriptionStatus(json.subscriptionStatus)
        })
    }else{
      router.push("/")
    }
    })
    return () => { //on Unmount this will be called
      listen();
    }   
    
  }, [])

  const handleCancel = () => {
    
  }
  return (
    <div className='flex flex-col w-[100%] items-center'>
      {/* <div>
        <p>Set default Language</p>
      </div> */}
      {/* <p>Change plan</p> */}
      { /*plan && plan == "free" ? <>
      <h1 className='mb-8'>{`Your Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}</h1>
      </>:<></>*/}
      {
        plan ? <>
        <h1 className='mb-8'>{`Your Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}</h1>
        {
          plan == "special" ? <></>: <>
            <h1 className='mb-8'>{`Status: ${subscriptionStatus}`}</h1>
          </>
        }
  
        </>: <>
        </>
      }
      
      { 
        plan != "premium" && subscriptionStatus == "ACTIVE" ? <>
        <Button 
        text={"Cancel Subscription"} 
        color={"bg-red-600"} 
        width={"md:w-[40%] w-[80%]"}
        handleClick={() => setIsCancelClicked(true)}
        />
        </> : <>
        {
          plan == "special" ? <>
          </>:<>
          <Button 
        text={"Subscribe"} 
        color={"bg-green-600"} 
        width={"md:w-[40%] w-[80%]"}
        handleClick={() => router.push("/onboarding/plans")}
        />

          </>
        }
        
        </>
      }
      
      <Button 
        text={"Delete Account"} 
        color={"bg-red-600"} 
        width={"md:w-[40%] w-[80%] mt-8"}
        handleClick={() => setIsDeleteAccountClicked(true)}
      />

      {/* <div>
        <p>Delete Account</p>
      </div> */}

      {
        isCancelClicked ? <CancelSubscriptionModal setIsCancelClicked={setIsCancelClicked} handleCancel={handleCancel}/> : ""
      }
      {
        isDeleteAccountClicked ?  <CancelModal setIsDeleteAccountClicked={setIsDeleteAccountClicked}/> : ""
      }
    </div>
  )
}

export default Settings