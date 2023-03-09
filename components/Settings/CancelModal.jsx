import React from 'react'

function CancelModal({setIsCancelClicked}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-xl">
      <div className='flex flex-col mt-[-10%] w-[80%] md:w-[40%]'>
        <div className='bg-gray-200 w-[100%] rounded-xl shadow-2xl flex justify-center'>
          <div className='flex'>
            <div onClick={() => setIsCancelClicked(prev => !prev)}>
                <p>Keep Subscription</p>
            </div>
            <div className='p-2 bg-red-600'>
                <p>Cancel Subscription</p>
            </div>

          </div>
          
        </div>
      </div>
      

    </div>
  )
}

export default CancelModal