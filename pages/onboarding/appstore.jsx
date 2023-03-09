import React from 'react'
import  AppstoreIcon from '../images/Appstore.svg'
import Image from 'next/image'
function Appstore() {
  return (
    <div className='flex flex-col items-center'>
      <div className='h-screen w-[100%] flex flex-col items-center justify-around p-48'>
        {/* <h1 className='text-4xl'></h1> */}
        <Image src={AppstoreIcon} width="260" height="222" className='mb-48 hover:cursor-pointer'/>
      
        
      </div>
    </div>
  )
}

export default Appstore