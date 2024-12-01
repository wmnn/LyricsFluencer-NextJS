import Button, { buttonStyles } from "../Button";
import { useRouter } from "next/router";
import SettingsIcon from "../icons/SettingsIcon";
import Icon from "../icons/Icon";
import { useContext, useEffect, useState } from "react";
import { DeckContext } from "../context/DeckContext";
import DeleteIcon from "../icons/DeleteIcon";
import DeleteDeckPopup from "./DeleteDeckPopup";
import LearnDeckPopup from "./LearnDeckPopup";

export default function DeckButton({deckName, cards}) {

    const router = useRouter();
    const [dueCardsCount, setDueCardsCount] = useState(0)
    const {deckContext, setSelectedDeck} = useContext(DeckContext)
    const [isDeletePopupShown, setIsDeletePopupShown] = useState(false);
    const [isLearnDeckPopupShown, setIsLearnDeckPopupShown] = useState(false);

    useEffect(() => {
        countDueCards()
    }, [deckContext])

    function countDueCards() {
        let count = 0;
        const currentDate = new Date()
        for(const card of cards) {
            try {
                if (new Date(card.due) < currentDate) {
                    count++
                }
            } catch (e) {
                console.log(e)
            }
        }
        setDueCardsCount(count);
    }

    return <>
        <div className={`${buttonStyles} items-center`}>
            <div className="flex justify-between grow w-full">
                <div>

                </div>
                <button className={`grow text-center`} onClick={() => {
                    if(dueCardsCount > 0) {
                        setIsLearnDeckPopupShown(true)
                    }
                }}>
                    {deckName} 
                </button>

                <div className="flex items-center">
                    {dueCardsCount}
                    <Icon onClick={() => {
                        setSelectedDeck(deckName)
                        router.push(`/decks/edit/${deckName}`)
                    }}>
                        <SettingsIcon />
                    </Icon>
                    <Icon onClick={() => setIsDeletePopupShown(true)}>
                        <DeleteIcon/>
                    </Icon>
                </div>
                
            </div>
            
            
        </div>

        {isLearnDeckPopupShown ? <LearnDeckPopup 
            deckName={deckName}
            handleAbort={() => setIsLearnDeckPopupShown(false)} 
        /> : ''}

        {isDeletePopupShown ? <DeleteDeckPopup 
            deckName={deckName}
            handleAbort={() => setIsDeletePopupShown(false)} 
        /> : ''}
    </>
}