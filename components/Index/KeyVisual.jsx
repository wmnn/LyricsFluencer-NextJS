import React, { useState }  from 'react'
import { useRouter } from "next/router";
import Button from '../Button';
import {RegisterModal, LoginModal} from '../index';
import PremiumPlanDescription from '../PremiumPlanDescription';


function KeyVisual() {
    const router = useRouter()
    const [isRegisterClicked, setIsRegisterClicked] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)

  return (
        <>
        {
              isRegisterClicked ? <RegisterModal setIsRegisterClicked={setIsRegisterClicked} setIsLoginClicked={setIsLoginClicked}/> : ""
        }
        {
              isLoginClicked ? <LoginModal setIsLoginClicked={setIsLoginClicked} setIsRegisterClicked={setIsRegisterClicked}/> : ""
        }
   
      <div className='w-[100%] flex flex-col items-center justify-around px-8'>
        <div className="py-16 md:py-24">
                <h1 className='text-4xl font-bold'>LyricsFluencer</h1>
                <h2 className='text-2xl'>Learn a lanugage while listening to music</h2>
        </div>

        <div className='rounded-2xl w-[100%] flex flex-col items-center mt-8'>
          <PremiumPlanDescription />
        
          <div className='w-[100%] flex flex-col items-center space-y-4 mt-48'>
            <Button 
              text={"Get started"}
              color={"bg-black"}
              width={"md:w-[60%] xl:w-[40%] w-[80%]"}
              handleClick={() => setIsRegisterClicked((prev) => !prev)}
            />
            <Button 
              text={"Login"}
              color={"bg-black"}
              width={"md:w-[60%] xl:w-[40%] w-[80%]"}
              handleClick={() => setIsLoginClicked((prev) => !prev)}
            />
          </div>
        </div>
        
      </div>
  
        </>
  )
}

export default KeyVisual