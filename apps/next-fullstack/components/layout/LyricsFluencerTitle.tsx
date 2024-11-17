import { useRouter } from "next/router";
import { RouterPaths } from "../staticData";

export function LyricsFluencerTitle() {

    const router = useRouter()

    return (
        <button className="basis-0 grow max-w-[40%] flex flex-col items-center hover:cursor-pointer text-center" onClick={() => router.push(RouterPaths.Home)}>
            <h1 className='text-xl font-bold'>LyricsFluencer</h1>
            <h2 className='text-l'>Learn lanugages with music</h2>
        </button>
    )
}