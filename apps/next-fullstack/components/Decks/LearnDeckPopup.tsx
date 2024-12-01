import { useContext, useEffect, useState } from "react";
import Popup from "../Popup";
import { DeckContext } from "../context/DeckContext";
import { getAuthToken } from "@lyricsfluencer/firebase-client";
import Button, { buttonStyles } from "../Button";
import CrossIcon from "../icons/CrossIcon";
import Icon from "../icons/Icon";

export default function LearnDeckPopup({ deckName, handleAbort }) {

    const {deckContext, setDeckContext} = useContext(DeckContext);
    const [dueCards, setDueCards] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [isBackShown, setIsBackShown] = useState(false);
    
    useEffect(() => {
        loadDueCards()
    }, [])

    function loadDueCards() {
        const deck = deckContext.filter(deck => deck.deckName == deckName)[0]
        if (!deck) return;
        const filteredCards = deck.cards.filter(card => new Date(card.due) < new Date());
        if (filteredCards.length == 0) {
            handleAbort()
        }
        setDueCards(filteredCards)
        setCurrentIdx(0);
    }
    function handleAgain() {
        
        const newCard = dueCards[currentIdx];

        setDueCards(prev => {
            newCard.interval = 0;
            newCard.due = new Date()
            return [...prev, newCard]
        })

        setCurrentIdx(prev => prev + 1)
        setIsBackShown(false);
        updateCardInBackend(newCard);

    }

    function handleAllCardsLearned() {
        // Need to calculate + 1, because the current idx isn't updated yet
        if (currentIdx + 1>= dueCards.length) {
            handleAbort()
        }
    }

    async function updateCardInBackend(updatedCard) {

        const token = await getAuthToken();
        if (!token) return;

        const res = await fetch('/flashcards/decks/cards', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,  // Send token as Bearer token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName,
                card: updatedCard
            })
        })
        console.log(res.status)
        if (res.status !== 200) return;
        const resBody = await res.json();
        setDeckContext((prev) => prev.map(deck => {
            if (deck.deckName !== deckName) return deck;
            deck.cards = deck.cards.map(c => {
                if (c.id !== updatedCard.id) return c;
                return resBody.card
            })
            return deck;
        }));
    }

    async function handleGood() {

        const card = {
            ...dueCards[currentIdx]
        };
        card.interval = getNextInterval(card.interval)
        card.due = getNextDue(card.interval)
        setCurrentIdx(prev => prev + 1)
        setIsBackShown(false);
        updateCardInBackend(card);
        handleAllCardsLearned()

    }

    function getNextInterval(currentInterval) {
        if (currentInterval == 0) {
            return 1
        }
        return currentInterval * 2
    }
    function getNextDue(interval) {
        const currentDate = new Date();  // Get the current date
        currentDate.setDate(currentDate.getDate() + interval);  // Add the interval to the current date
        return currentDate.toISOString();
    }
    
    return <Popup>
        <div className="bg-white p-8 rounded-2xl min-w-[300px] min-h-[480px] flex flex-col">
            <div className="flex justify-end">
                <Icon onClick={() => handleAbort()}>
                    <CrossIcon />
                </Icon>
            </div>
            
                
            <div className="grow" onClick={() => setIsBackShown(true)}>
                <p>{dueCards[currentIdx]?.front ?? ''}</p>
                <p>{isBackShown ? dueCards[currentIdx]?.back ?? '' : ''}</p>
            </div>
            
            {isBackShown ? 
                <div className="flex gap-2">
                    <Button handleClick={() => handleAgain()}>
                        <p className="text-red-600">Again</p>
                    </Button>

                    <Button  text={`Good`} handleClick={() => handleGood()}>
                        <p className="text-green-600">Good</p>
                    </Button>
                </div>
            : ''}

        </div>
    </Popup>
}