import React, { useContext, useEffect } from "react";
import { handleAuthStateChange } from "../auth";
import { LyricsFluencerTitle } from "./LyricsFluencerTitle";
import { Menu } from "./Menu";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";

export default function Header () {

    const {userContext, setUserContext} = useContext(UserContext);
    const router = useRouter();
    
    useEffect(() => {
        handleAuthStateChange(setUserContext, router);
    }, []);

    return (
        
        <div className="flex flex-row justify-center items-center p-8 relative">
            <LyricsFluencerTitle />
            <Menu />
        </div>
    
    )
}