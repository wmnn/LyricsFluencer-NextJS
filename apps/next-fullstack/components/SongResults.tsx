import React, { useContext } from "react"
import ResultSongsContext from '../components/Context/ResultSongsContext';
import SongContext from '../components/Context/SongContext';

function SongResults({ targetLanguage }) {

    const {songContext, setSongContext}: any = useContext(SongContext);
    const {resultSongsContext, setResultSongsContext}: any = useContext(ResultSongsContext);

    async function handleSelectedSong(song) {
        const data = await (await fetch('/api/selected', {
            method: 'POST',
            body: JSON.stringify({
                url: song.track.track_share_url,
                targetLanguage: targetLanguage
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        if (data.lyrics && data.translation) {

            setSongContext((prev) => {
                return {
                    isSongShown: !prev.isSongShown,
                    lyrics: data.lyrics.split('\n'),
                    translation: data.translation.split('\n'),
                    song: song
                }
            })

        }
    }


    return <>
    
    <div className='flex flex-col'>{
        
        resultSongsContext?.map((song, i) => 
            <button onClick={() => handleSelectedSong(song)} className='my-8 border-2 rounded-xl lg:w-[50%] lg:ml-[25%]' key={i}>
                <p>Artist: {song.track.artist_name}</p>
                <p>Song: {song.track.track_name}</p>
                <p>Album: {song.track.album_name}</p>
            </button>
        )

    }</div>
    
    </>
}

export default SongResults