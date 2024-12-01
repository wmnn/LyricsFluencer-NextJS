import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import Icon from "../icons/Icon";
import SettingsIcon from "../icons/SettingsIcon";
import DeleteCardPopup from "./DeleteCardPopup";
import EditCardPopup from "./EditCardPopup";

export default function Card({ card, deckName }) {

    const [isDeletePopupShown, setIsDeletePopupShown] = useState(false);
    const [isEditPopupShown, setIsEditPopupShown] = useState(false);

    return <div className="flex justify-between w-full">
        <p>Front: {card.front}</p>
        <p>Back: {card.back}</p>
        <p>Due: {JSON.stringify(card.due)}</p>
        <div>
            <Icon onClick={() => setIsEditPopupShown(true)}>
                <SettingsIcon />
            </Icon>
            <Icon onClick={() => setIsDeletePopupShown(true)}>
                <DeleteIcon/>
            </Icon>
        </div>

        {isDeletePopupShown ? <DeleteCardPopup 
            card={card}
            handleAbort={() => setIsDeletePopupShown(false)} 
        /> : ''}

        {isEditPopupShown ? <EditCardPopup deckName={deckName} card={card} handleAbort={() => setIsEditPopupShown(false)} /> : ''}
        
    </div>
}