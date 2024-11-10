import { useEffect, useState, useContext } from "react";
import SongResult from "./Index/SongResult";
import UserContext from './Context/UserContext';

export default function PopularSongs() {

    const [popularSongs, setPopularSongs] = useState([])
    const {userContext, setUserContext}: any = useContext(UserContext);

    async function fetchPopularSongs() {

        const res : any = await (await fetch('/api/popular', {
            method: 'POST',
            body: JSON.stringify({
                target: userContext?.learnedLanguage ?? 'en'
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        if (res.status == 200) {
            setPopularSongs(res.songs)
        }

    }
    useEffect(() => {
        fetchPopularSongs()
    }, [])

    return <>
        <h1 className="text-2xl py-4">Popular songs</h1>
        <div className="flex flex-col gap-2">
            {
                popularSongs.map((song, i) => <SongResult song={song} key={i}/>)
            }
        </div>
    </>

}