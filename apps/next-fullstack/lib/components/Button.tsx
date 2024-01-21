import React from 'react'

//@ts-ignore
function Button({text, type, textColor, color, width, handleClick}) {
  return (
    <button type={type} className={'p-2 text-center text-2xl rounded shadow-xl hover:cursor-pointer ' + (color ? color + " " : "") + (textColor ? "text-" + textColor + " " : "text-white ") + (width ? width + " " : "w-[100%]")} onClick={() => handleClick()}>
        {text}
    </button>
  )
}

Button.propTypes = {
  // message: PropTypes.string,
  // onClick: PropTypes.func
};

Button.defaultProps = {
  text: 'Hello World',
  type: 'button',
  textColor: 'black', 
  color: 'white', 
  width: 'w-100', 
  handleClick: () => {} 
};

export default Button