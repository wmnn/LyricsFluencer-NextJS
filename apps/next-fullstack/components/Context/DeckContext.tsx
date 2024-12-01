import { createContext, useEffect, useState } from 'react'

const DeckContext = createContext<any>([]);

interface DeckContextType {
    deckContext: Deck[],
    setUserContext: (updateFn: (prev: Deck[]) => Deck[]) => void;
    selectedDeck,
    setSelectedDeck
}

function DeckContextProvider({children}) {

    const [deckContext, setDecks] = useState<Deck[]>([])
    const [selectedDeck, setSelectedDeck] = useState<string>('')
    
    useEffect(() => {
        
        const decksString = localStorage.getItem('decks');
       
        if (decksString && decksString != "undefined") {
            setDecks(JSON.parse(decksString))
        } else {
            console.log('No decks are saved')
        }

    }, [])

    function setDeckContext(updateFn: (prev: Deck[]) => Deck[]) {
        const decks: Deck[] = updateFn(deckContext);
        localStorage.setItem('decks', JSON.stringify(decks));
        setDecks(decks);
    }
    
    return (
        <DeckContext.Provider value={{deckContext, setDeckContext, selectedDeck, setSelectedDeck}}>
            {children}
        </DeckContext.Provider>
    )

}
export { DeckContext, DeckContextProvider }

export interface Deck {
    deckName: string,
    cards: any
}