import React, { useState } from 'react'
import Button from '../Button'

function CancelSubscriptionModal({setIsCancelClicked, handleCancel}) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-xl h-[100%]">
      <div className='flex flex-col mt-[-10%] w-[80%] md:w-[40%] h-[100%] justify-center items-center'>
        <div className='bg-gray-200 w-[100%] h-[40%] rounded-xl shadow-2xl flex flex-col items-center justify-around'>
           {
            !showConfirmation ? <>
            <h1>Do you want to end your subscription?</h1>
           <div className='flex items-center w-[100%] px-8 space-x-8'>
              <Button 
                  text={"Cancel"} 
                  color={"bg-white"} 
                  width={"w-[100%]"}
                  handleClick={() => setIsCancelClicked(false)}
                  textColor={"text-black"}
                  />
            
            <Button 
                  text={"Yes"} 
                  color={"bg-red-600"} 
                  width={"w-[100%]"}
                  handleClick={() => setShowConfirmation(true)}
                  textColor={"text-black"}
              />   
            </div>       
            </>: <>
            <h1>Are you sure?</h1>
            <div className='flex items-center w-[100%] px-8 space-x-8'>
            <Button 
                text={"No"} 
                color={"bg-white"} 
                width={"w-[100%]"}
                handleClick={() => setIsCancelClicked(false)}
                textColor={"text-black"}
                />
           
           <Button 
                text={"Yes, delete"} 
                color={"bg-red-600"} 
                width={"w-[100%]"}
                handleClick={() => {
                
                  handleCancel()
                  //2. DELETE
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

export default CancelSubscriptionModal