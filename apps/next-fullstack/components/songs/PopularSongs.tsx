import { useEffect, useState, useContext } from "react";
import SongResult from "./SongResult";
import { UserContext } from '../context/UserContext';
import ClipLoader from "react-spinners/ClipLoader";

export default function PopularSongs() {

    const [popularSongs, setPopularSongs] = useState([])
    const {userContext, setUserContext}: any = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchPopularSongs() {

        setIsLoading(true);
        const res : any = await (await fetch('/api/popular', {
            method: 'POST',
            body: JSON.stringify({
                target: userContext?.learnedLanguage ?? 'en'
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()
        setIsLoading(false);

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
                isLoading ? 
                    <div className="flex justify-center my-8">
                        <ClipLoader color="#7a7a7a" size={28} />
                    </div>
                :
                    popularSongs.map((song, i) => <SongResult song={song} key={i}/>) 
            }
        </div>
    </>

}