import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const buttonStyles = `pl-4 pr-4 w-full pt-2 pb-2
flex justify-center gap-2 items-center text-lg border-gray-200 
border-[1px] hover:bg-gray-200 transition-all text-center 
rounded-xl shadow-xl 
hover:cursor-pointer `
function Button({text, type, textColor, color, handleClick, isLoading, children}) {

    const height = '30px'

    return (
        <button 
            type={type} 
            className={`
                ${buttonStyles}
                ${color ? color + " " : ""} 
                ${textColor ? "text-" + textColor + " " : "text-white "}
            `} 
            onClick={() => handleClick()}
        >
            
            {children ? children : 
                <div className={`h-[${height}] flex justify-center items-center gap-2`}>
                    {!isLoading ? text : <ClipLoader color="#7a7a7a" size={28} />}
                </div>       
            }
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
  handleClick: () => {},
  isLoading: false,
  children: undefined
};

export default Button