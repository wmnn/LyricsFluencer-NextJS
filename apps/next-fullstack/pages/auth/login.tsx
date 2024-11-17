import React, { useContext, useState } from 'react'
import { handleSignIn } from '../../components/auth';
import { useRouter } from 'next/router';
import Popup from '../../components/Popup';
import { Button } from '../../components';
import { UserContext } from '../../components/context/UserContext';

function Login() {

    const router = useRouter();
    const {userContext, setUserContext} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
        <Popup>
            <form 
                onSubmit={(e) => {
                    e.preventDefault(); 
                    handleSignIn(email, password, router, setUserContext);
                }} 
                className={`
                    p-8 flex flex-col justify-center
                    bg-gray-200 w-[100%] rounded-xl shadow-2xl md:w-[40%]
                `}>
                
                <label className='flex justify-between'>
                    <p>Email:</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded-xl p-2"/>
                </label>

                <label className='flex justify-between my-2'>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 rounded-xl p-2"/>
                </label>

                <Button text={`Login`} type={`submit`} color={`bg-black`} textColor={`white`}></Button>
            
            </form> 
        </Popup>
    )
}

export default Login