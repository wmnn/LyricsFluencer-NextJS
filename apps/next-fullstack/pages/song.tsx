import { useContext, useEffect, useState } from 'react';
import BackIcon from '../components/icons/BackIcon';
import Bar from '../components/songs/song/Bar';
import ClipLoader from 'react-spinners/ClipLoader';
import { UserContext } from '../components/context/UserContext';

export default function Song () {
    
    const [song, setSong]: any = useState({});
    const {userContext, setUserContext}: any = useContext(UserContext);

    useEffect(() => {
        fetchSong()
    }, [])

    async function fetchSong() {

        const searchParams = new URLSearchParams(window.location.search);
        const nativeLanguage = userContext?.nativeLanguage ?? 'fr';
        const res = await (await fetch(`/api/song?url=${searchParams.get('url')}&id=${searchParams.get('id')}&nativeLanguage=${nativeLanguage}`)).json();
        if (res.status == 200) {
            setSong(res.song);
        }

    }
    return <>

        <button onClick={() => history.back()} className="my-8">
            <BackIcon />
        </button>

        <div className='pb-8 text-xl flex flex-col gap-2'>
            <h2>Song: {song.name}</h2>
            <h2>Artist: {song.artist}</h2>
            <h2>Album: {song.album}</h2>
        </div>

        {
            song?.lyrics ? <>
                {song?.lyrics.map((bar: string, i) => {
                    return <>
                        <div key={i}>
                            <Bar bar={bar}/>
                            { 
                                song?.translation[i] ? 
                                    <p className='h-8 text-yellow-600'>{song?.translation[i]}</p>
                                : ''
                            }
                        </div>
                    </>
                })}
            </> : 
            <p> 
                <ClipLoader color="#7a7a7a" size={28} />
            </p>
        }
    
    </>
}