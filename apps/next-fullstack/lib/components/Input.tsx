import React from 'react'

function Input({handleChange, value, type}) {
  return (
    <input type={type} value={value} onChange={(e) => handleChange(e)} className="bg-gray-100 w-[100%] rounded-xl p-2"/>
  )
}

export default Input