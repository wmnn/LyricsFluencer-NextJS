import { useContext, useEffect } from "react"
import { UserContext } from "../components/context/UserContext";
import { handleProtectedRoute } from "../components/auth";
import { useRouter } from "next/router";
import { auth, getAuthToken } from "@lyricsfluencer/firebase-client";

export default function Decks() {

    const {userContext, setUserContext} = useContext(UserContext)
    const router = useRouter();

    useEffect(() => {
        fetchDecks()
    })

    async function fetchDecks() {
        // await handleProtectedRoute(router);
        const token = await getAuthToken();
        if (!token) return;
        const res = await fetch('/flashcards/decks', {
            headers: {
                'Authorization': `Bearer ${token}`  // Send token as Bearer token
            }
        });
        console.log(await res.json())
    }
    
    return <>
    
    
    </>
}