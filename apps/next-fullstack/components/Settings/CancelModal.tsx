import React, {useState} from 'react'
import Button from '../Button'
import { auth } from '@lyricsfluencer/firebase-client'
import { onAuthStateChanged } from 'firebase/auth';
import { root } from '../staticData'
import { useRouter } from "next/router";
import { signOut } from 'firebase/auth'

function CancelModal({setIsDeleteAccountClicked}) {
    const router = useRouter()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const handleDelete = async () => {
        const listen = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const res = await (await fetch(
                root + `/payment/account?token=${(user as any).accessToken}`, {
                    method: "DELETE",
                    body: JSON.stringify({
                        token: (user as any).accessToken
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )).json()

            if (res.status == 200){
            userSignOut()
            router.push("/")
            }
        }
        })

    }
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed user out')
            router.push("/")
            
        }).catch(error => console.log(error))
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-xl h-[100%]">
        <div className='flex flex-col mt-[-10%] w-[80%] md:w-[40%] h-[100%] justify-center items-center'>
            <div className='bg-gray-200 w-[100%] h-[40%] rounded-xl shadow-2xl flex flex-col items-center justify-around'>
            {
                !showConfirmation ? <>
                <h1>Do you want to delete your Account?</h1>
            <div className='flex items-center w-[100%] px-8 space-x-8'>
                <Button 
                    text={"Cancel"} 
                    color={"bg-white"} 
                    handleClick={() => setIsDeleteAccountClicked(false)}
                    textColor={"text-black"}
                    />
                
                <Button 
                    text={"Delete Account"} 
                    color={"bg-red-600"} 
                    handleClick={() => setShowConfirmation(true)}
                    textColor={"text-black"}
                />   
                </div>       
                </>: <>
                <h1>Are you sure? You won't have access to the app anymore</h1>
                <div className='flex items-center w-[100%] px-8 space-x-8'>
                <Button 
                    text={"Cancel"} 
                    color={"bg-white"}
                    handleClick={() => setIsDeleteAccountClicked(false)}
                    textColor={"text-black"}
                    />
            
            <Button 
                    text={"Yes, Delete"} 
                    color={"bg-red-600"}
                    handleClick={() => {
                    handleDelete();
                    }}
                    textColor={"text-black"}
                />  
                
                </div>
                </>
            }

            
            </div>
        </div>
        

        </div>
    )
}

export default CancelModal