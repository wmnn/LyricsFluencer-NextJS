import React from 'react'
import AppstoreIcon from '../../components/AppstoreIcon'
function Appstore() {
  return (
    <div className='flex flex-col items-center'>
      <div className='h-screen w-[100%] flex flex-col items-center justify-around py-24 md:p-48'>
        {/* <h1 className='text-4xl'></h1> */}
        <h1>Your Account is created, you can now go to the app.</h1>
        <AppstoreIcon />
      </div>
    </div>
  )
}

export default Appstore