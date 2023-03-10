import React from 'react'
import MyAppstoreIcon from '../src/images/Appstore.svg'
import Image from 'next/image'

function AppstoreIcon() {
  return (
    <Image src={MyAppstoreIcon} width="220" height="222" className='hover:cursor-pointer'/>
  )
}

export default AppstoreIcon