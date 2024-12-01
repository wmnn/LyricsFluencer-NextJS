import { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext';
import AddCardPopup from "../../Decks/AddCardPopup";

export default function SongPopup({ word }) {

    const {userContext, _}: any = useContext(UserContext);
    const [isAddToDeckPopupShown, setIsAddToDeckPopupShown] = useState(false);

    return <div className="bg-white p-8 flex flex-col items-center border-[1px] border-black rounded-xl w-[240px]">
        <button onClick={() => setIsAddToDeckPopupShown(true)}>
            Add to deck
        </button>

        <a target="_blank" href={`
            https://translate.google.com/?sl=auto&tl=${userContext?.nativeLanguage ?? 'en'}&text=${word.toLowerCase()}&op=translate`}>
            Translate
        </a>

        {isAddToDeckPopupShown ? 
            <AddCardPopup onAbort={() => setIsAddToDeckPopupShown(false)} cardFront={word}/>
        : ''}
    </div>
}