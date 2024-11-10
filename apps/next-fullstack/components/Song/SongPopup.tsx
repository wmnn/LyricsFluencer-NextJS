import { useContext } from "react";
import UserContext from '../Context/UserContext';

export default function SongPopup({ word }) {

    const {userContext, _}: any = useContext(UserContext);

    return <div className="bg-white p-8 flex flex-col items-center border-[1px] border-black rounded-xl w-[240px]">
        <button>
            Add to deck
        </button>

        <a target="_blank" href={`
            https://translate.google.com/?sl=auto&tl=${userContext?.nativeLanguage ?? 'en'}&text=${word.toLowerCase()}&op=translate`}>
            Translate
        </a>
    </div>
}