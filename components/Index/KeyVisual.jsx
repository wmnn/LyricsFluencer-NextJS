import React, { useState }  from 'react'
import { useRouter } from "next/router";
import Button from '../Button';
import { SiShazam } from 'react-icons/si'
import {RegisterModal, LoginModal} from '../index';


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

        <div className='rounded-2xl w-[100%] flex flex-col items-center md:p-16 '>
          <ul className='md:px-8 text-2xl pb-16 md:pb-48'>
            <li className=''>Unlimited Requests</li>
            <li className=''>Quick Search Songs</li>
            <li className=''>Translate Lyrics</li>
            <li className=''>Google the Meaning</li>
            <li className=''>Flashcard decks</li>
            <li className='flex items-center'><SiShazam color='#205AFF'/> <p className='pl-2'>Shazam Song Recognition</p></li>  
            <p className='text-2xl p-4 font-normal'>Test it 14 days, then 39.99€/ Monat</p>
          </ul>
        
          <div className='w-[100%] flex flex-col items-center space-y-4'>
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