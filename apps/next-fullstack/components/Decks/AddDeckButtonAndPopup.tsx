import { useContext, useState } from "react";
import Button from "../Button";
import PlusIcon from "../icons/PlusIcon";
import Popup from "../Popup";
import Input from "../Input";
import { getAuthToken } from "@lyricsfluencer/firebase-client";
import { DeckContext } from "../context/DeckContext";

export default function AddDeck() {

    const [isAddDeckPopupShown, setIsAddDeckPopupShown] = useState(false);

    return <>
    
        <Button handleClick={() => setIsAddDeckPopupShown(true)}>
            <PlusIcon />
            <p>Add deck</p>
        </Button>

        {isAddDeckPopupShown ? <AddDeckPopup handleAbort={() => setIsAddDeckPopupShown(false)}/> : ''}

    </>

}

function AddDeckPopup({handleAbort}) {

    const {deckContext, setDeckContext} = useContext(DeckContext);
    const [deckName, setDeckName] = useState('');

    async function onSubmit() {

        const token = await getAuthToken();
        if (!token) return;
        const res = await fetch('/flashcards/decks', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName
            })
        })
        if (res.status !== 200) return;
        const resBody = await res.json()
        setDeckContext((prev) => {
            const newDecks = [...prev, resBody.deck]; // Create a new array
            return newDecks;
        });
        handleAbort()

    }

    return <Popup>
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4">
            <div>
                <label>
                    Deck name:
                </label>
                <Input value={deckName} handleChange={(e) => setDeckName(e.target.value)} type="text" />
            </div>
          
            <div className="flex gap-2">
                <Button handleClick={() => handleAbort()}>
                    Cancel
                </Button>

                <Button handleClick={() => onSubmit()}>
                    Add deck
                </Button>
            </div>
            
        </div>
    </Popup>
}