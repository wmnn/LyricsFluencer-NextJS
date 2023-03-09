import React, {useState} from 'react'
import CancelModal from '../components/CancelModal'
import Button from '../components/Button'

function Settings() {
  const [isCancelClicked, setIsCancelClicked] = useState(false)
  return (
    <div className='flex flex-col w-[100%] items-center'>
      {/* <div>
        <p>Set default Language</p>
      </div> */}
      {/* <p>Change plan</p> */}
      <Button 
        text={"Cancel Subscription"} 
        color={"bg-red-600"} 
        width={"md:w-[40%] w-[80%]"}
        handleClick={() => setIsCancelClicked(true)}
      />

      {/* <div>
        <p>Delete Account</p>
      </div> */}

      {
        isCancelClicked ? <CancelModal setIsCancelClicked={setIsCancelClicked}/> : ""
      }
    </div>
  )
}

export default Settings