import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../src/util/firebase'
import { useRouter } from "next/router";

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log("Logged in" + userCredential.user.email)
          //setUserContext(userCredential.user)
          router.push("/onboarding/plans")
      }).catch((error) => {
          console.log(error)
      })
    }
  return (
    <div>

<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-xl">
      <div className='flex flex-col mt-[-10%] w-[80%] md:w-[40%]'>
        <div className='flex justify-end'>
         
        </div>
        <div className='bg-gray-200 w-[100%] rounded-xl shadow-2xl flex justify-center'>
          <form onSubmit={handleSignIn} className="flex flex-col w-[80%] my-8">
            
              <label className='flex justify-between'>
                <p>Email:</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded-xl p-2"/>
              </label>

            <label className='flex justify-between my-2'>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 rounded-xl p-2"/>
            </label>
            <button type="submit" className='w-[100%] bg-black text-white rounded-3xl p-2 my-4'>Login</button>
           
          </form>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login