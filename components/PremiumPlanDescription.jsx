import React from 'react'
import { SiShazam } from 'react-icons/si'
import {AiOutlineSearch} from 'react-icons/ai'
import {BiTrendingUp, BiTimeFive, BiMessageRoundedDots} from 'react-icons/bi'

function PremiumPlanDescription() {
  return (
    <ul className='text-2xl'>
            {/* <li className=''>Unlimited Requests</li> */}
            <li className='flex items-center'><BiTrendingUp className='mr-2'/>Learn with trending songs</li>
            <li className='flex items-center'><BiMessageRoundedDots className='mr-2'/>Express yourself like a native speaker</li>
            <li className='flex items-center'><BiTimeFive className='mr-2'/>Save time looking up lyrics</li>
            <li className='flex items-center'><AiOutlineSearch className='mr-2'/>Google the Meaning</li>
            <li className='flex items-center'><SiShazam color='#205AFF'/> <p className='pl-2'>Shazam Song Recognition</p></li> 
            <p className='text-2xl font-normal'>19.99€ billed monthly, 30 Days Money Back Guarantee!</p>
    </ul>
  )
}

export default PremiumPlanDescription