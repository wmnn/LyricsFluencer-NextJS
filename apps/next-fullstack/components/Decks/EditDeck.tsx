import AddCardButton from "./AddCardButton"
import CardButton from "./CardButton"

export default function EditDeck({deck}) {
    return <>
        {deck.cards?.map((card, i) => {
            return <div key={i}>
                <CardButton card={card} deckName={deck.deckName}/>
            </div>
        })}
        <AddCardButton />
    </>
}