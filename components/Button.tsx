import React from 'react'

function Button({text, textColor, color, width, handleClick}) {
  return (
    <div className={'p-2 text-center text-2xl rounded shadow-xl hover:cursor-pointer ' + (color ? color + " " : "") + (textColor ? "text-" + textColor + " " : "text-white ") + (width ? width + " " : "w-[100%]")} onClick={() => handleClick()}>
        <p>{text}</p>
    </div>
  )
}

export default Button