import { useContext } from "react"
import { DeckContext } from "../context/DeckContext"

export default function DeckSelectionMenu() {

    const {deckContext, selectedDeck, setSelectedDeck} = useContext(DeckContext);

    function handleChange(newVal) {
        setSelectedDeck(newVal)
    }
    return <>
        <label className=" text-gray-600">Deck:</label>
        <select name="decks" id="decks" className={'pl-4 pr-4 pt-2 pb-2 text-lg border-gray-200 border-[1px] hover:bg-gray-200 transition-all w-full text-center rounded-md shadow-xl hover:cursor-pointer text-black'} onChange={(e) => handleChange(e.target.value)} value={selectedDeck}>
            {deckContext.map((deck, i) => 
                    <option key={i} value={deck.deckName}>{deck.deckName}</option>
            )}
        </select>
    
    </>
}