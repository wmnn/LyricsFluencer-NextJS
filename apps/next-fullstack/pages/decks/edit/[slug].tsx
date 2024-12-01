import { useContext, useEffect, useState } from "react"
import { DeckContext } from "../../../components/context/DeckContext";
import EditDeck from "../../../components/Decks/EditDeck";
import { getSlug } from "../../../components/Decks/decks";

export default function Slug() {

    const {deckContext, setDeckContext} = useContext(DeckContext);
    const [deck, setDeck] = useState<any>({});
    
    useEffect(() => {
        getDeck()
    }, [deckContext])

    function getDeck() {
        const slug = getSlug();
        const deck = deckContext.filter(o => o.deckName.toLowerCase() == (slug as string).toLowerCase())[0] ?? {}
        setDeck(deck);
    }

    return <>
        <EditDeck deck={deck} />
    </>
}