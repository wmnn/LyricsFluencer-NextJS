import { useContext } from 'react'
import SongContext from '../context/SongContext';
import { UserContext } from '../context/UserContext';
import { SelectedSongRequest, SelectedSongResponse, Song } from "../types";
import { useRouter } from 'next/router';

export default function SongResult({ song, key }) {

    const {_, setSongContext}: any = useContext(SongContext);
    const {userContext, setUserContext}: any = useContext(UserContext);
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
            // setSongContext(_ => {
            //     return {
            //         lyrics: res.song.lyrics,
            //         translation: res.song.translation,
            //         song: res.song
            //     }
            // })
            router.push(`/song?id=${song.id}&url=${song.url}&nativeLanguage=${userContext?.nativeLanguage}`)
        }
    }

    return <button onClick={() => handleSelectedSong(song)} className='border-2 rounded-xl flex flex-col p-2' key={key}>
        <p>Artist: {song.artist}</p>
        <p>Song: {song.name}</p>
        <p>Album: {song.album ?? ''}</p>
    </button>
}