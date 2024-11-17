import React from 'react'

function Button({text, type, textColor, color, handleClick}) {
    return (
        <button 
            type={type} 
            className={`
                pl-4 pr-4 w-full pt-2 pb-2 
                flex justify-center gap-2 items-center text-lg border-gray-200 
                border-[1px] hover:bg-gray-200 transition-all text-center 
                rounded-xl shadow-xl 
                hover:cursor-pointer 
                ${color ? color + " " : ""} 
                ${textColor ? "text-" + textColor + " " : "text-white "}
            `} 
            onClick={() => handleClick()}
        >
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
  handleClick: () => {} 
};

export default Button