import React, { useContext } from "react"
import ResultSongsContext from '../Context/ResultSongsContext';
import SongContext from '../Context/SongContext';
import UserContext from '../Context/UserContext';
import { SelectedSongRequest, SelectedSongResponse, Song } from "../../types";
import { useRouter } from 'next/router';

function SongResults() {

    const {_, setSongContext}: any = useContext(SongContext);
    const {userContext, setUserContext}: any = useContext(UserContext);
    const {resultSongsContext, setResultSongsContext}: any = useContext(ResultSongsContext);
    const router = useRouter(); 

    async function handleSelectedSong(song: Song) {
        const requestData : SelectedSongRequest = {
            song,
            nativeLanguage: userContext?.nativeLanguage ?? 'DE' as string
        }
        const res: SelectedSongResponse = await (await fetch('/api/selected', {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        if (res.song.lyrics && res.song.translation) {
            setSongContext(_ => {
                return {
                    lyrics: res.song.lyrics,
                    translation: res.song.translation,
                    song: res.song
                }
            })
            router.push('/song')
        }
    }


    return <>
    
    <div className='flex flex-col gap-2 mt-8'>{
        
        resultSongsContext?.map((song: Song, i) => 
            <button onClick={() => handleSelectedSong(song)} className='border-2 rounded-xl flex flex-col p-2' key={i}>
                <p>Artist: {song.artist}</p>
                <p>Song: {song.name}</p>
                <p>Album: {song.album ?? ''}</p>
            </button>
        )

    }</div>
    
    </>
}

export default SongResults