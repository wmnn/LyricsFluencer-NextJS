import Button from "../Button";
import Popup from "../Popup";

export default function DeletePopup({handleAbort, onSubmit, text}) {
    return <Popup>
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4">
            <p>{text}</p>
            <div className="flex gap-2">
                <Button text={`Cancel`} handleClick={() => handleAbort()}></Button>
                <Button text={`Delete`} color={`text-red-600`} handleClick={() => onSubmit()}></Button>
            </div>
        </div>
    </Popup>
}