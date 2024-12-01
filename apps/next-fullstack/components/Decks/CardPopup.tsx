import Button from "../Button";
import Input from "../Input";
import Popup from "../Popup";
import DeckSelectionMenu from "./DeckSelectionMenu";

export default function CardPopup({onAbort, onSubmit, front, back, setFront, setBack, showDeckSelectionMenu}) {
    return <Popup>
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 text-black">
            {showDeckSelectionMenu ? <DeckSelectionMenu /> : ''}
            <label>
                Front:
            </label>
            <Input value={front} handleChange={e => setFront(e.target.value)} type="text" />
            <label>
                Back:
            </label>
            <Input value={back} handleChange={e => setBack(e.target.value)} type="text" />

            <div className="flex gap-2">
                <Button text={`Cancel`} handleClick={() => onAbort()}></Button>
                <Button text={`Save`} color={`text-green-600`} handleClick={() => onSubmit()}></Button>
            </div>

        </div>
    </Popup>
}