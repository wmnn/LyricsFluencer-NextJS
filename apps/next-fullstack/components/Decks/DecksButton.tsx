import Button from "../Button";
import { useRouter } from "next/router";

export default function DecksButton() {
    const router = useRouter();
    
    return <Button text={`Your flashcards`} handleClick={() => router.push('/decks')}/>
}