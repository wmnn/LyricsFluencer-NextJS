import { useContext, useEffect, useState } from "react"
import { handleProtectedRoute } from "../components/auth";
import { auth, getAuthToken } from "@lyricsfluencer/firebase-client";
import DeckButton from "../components/Decks/DeckButton";
import { DeckContext } from "../components/context/DeckContext";
import { UserContext } from "../components/context/UserContext";
import AddDeck from "../components/Decks/AddDeckButtonAndPopup";

export default function Decks() {

    const {deckContext, setDeckContext} = useContext(DeckContext)
    const {userContext, setUserContext} = useContext(UserContext)

    useEffect(() => {
        fetchDecks()
    }, [userContext])

    async function fetchDecks() {
        // await handleProtectedRoute(router);
        const token = await getAuthToken();
        if (!token) return;
        const res = await (await fetch('/flashcards/decks', {
            headers: {
                'Authorization': `Bearer ${token}`  // Send token as Bearer token
            }
        })).json();
        setDeckContext(() => res.decks);
    }
    
    return <div className="flex flex-col gap-4">
        {deckContext.map((deck, i) => {
            return <div key={i}>
                <DeckButton deckName={deck.deckName} cards={deck.cards}/>
            </div>
        })}

        <AddDeck />
    
    </div>
}