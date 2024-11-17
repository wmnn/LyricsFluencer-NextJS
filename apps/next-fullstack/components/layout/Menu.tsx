import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import DropdownMenu from './DropdownMenu'

export function Menu() {

    const [isMenuShown, setIsMenuShown] = useState(false)

    return <>
    
        {/* HAMBURGER MENU */}
        <button className="absolute top-10 right-10 z-20">
            <AiOutlineMenu size="24" onClick={() => setIsMenuShown((prev) => !prev)}/>
        </button>

        {/* This menu is shown, if a user clicks on the Menu Icon */}
        <DropdownMenu isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
        {/* { isMenuShown == true ? <DropdownMenu isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} /> : ""} */}
    </>
}