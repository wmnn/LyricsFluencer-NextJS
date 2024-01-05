import React from 'react'

function AppstoreIcon() {
  return (
    <div onClick={() => {window.location="https://apps.apple.com/us/app/lyricsfluencer/id6446182453"}}><img src={'/images/Appstore.svg'} width="220" height="222" className='hover:cursor-pointer'/></div>
  )
}

export default AppstoreIcon