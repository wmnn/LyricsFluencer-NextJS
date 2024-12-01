import { useRouter } from "next/router";
import { userSignOut } from "../auth";
import { RouterPaths } from "../staticData";
import DropdownMenuListItem from "./DropdownMenuListItem";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function HeaderMenu ({ isMenuShown, setIsMenuShown }) {

    const router = useRouter()
    const { userContext, setUserContext } = useContext(UserContext);
    
    function navigateAndCloseMenu(path: string) {
        setIsMenuShown(false)
        switch(path) {
            case RouterPaths.Login:
                router.push(RouterPaths.Login)
                break;
            case RouterPaths.Settings:
                router.push(RouterPaths.Settings)
                break;
            default:
                break;
        }        
    }

    return (
        <div className={`
            border-b border-black
            h-[100vh] w-[100%] absolute top-0 bg-white text-black flex flex-col justify-center 
            transition-all duration-500 ease-in-out ${isMenuShown ? 'translate-y-0' : 'translate-y-[-100vh]'}
        `}>

            <ul className="flex flex-col items-center text-2xl space-y-8">
                {
                    userContext.id ? <>
                        <DropdownMenuListItem title={'Settings'} onClick={() => {
                            navigateAndCloseMenu(RouterPaths.Settings)
                        }}/>
                        <DropdownMenuListItem title={'Logout'} onClick={() => {
                            userSignOut();
                            navigateAndCloseMenu(RouterPaths.Home)
                        }}/>
                    </> : <>
                        <DropdownMenuListItem title={'Login'} onClick={() => navigateAndCloseMenu(RouterPaths.Login)}/>
                    </>
                }
            </ul>  

        </div>
    )
}