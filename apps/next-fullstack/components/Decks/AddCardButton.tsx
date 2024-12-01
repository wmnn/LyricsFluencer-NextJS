import { useState } from "react";
import Button from "../Button";
import PlusIcon from "../icons/PlusIcon";
import AddCardPopup from "./AddCardPopup";

export default function AddCardButton() {

    const [isAddCardPopupShown, setIsAddCardPopupShown] = useState(false);
    return <>
        <Button handleClick={() => setIsAddCardPopupShown(true)}>
            <PlusIcon />
            <p>Add Card</p>
        </Button>

        {isAddCardPopupShown ? 
            <AddCardPopup onAbort={() => setIsAddCardPopupShown(false)}/>
        : ''}
    </>
}