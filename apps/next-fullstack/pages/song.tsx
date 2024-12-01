import { useEffect, useState } from 'react';
import BackIcon from '../components/icons/BackIcon';
import Bar from '../components/songs/song/Bar';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Song () {
    
    const [song, setSong]: any = useState({});

    useEffect(() => {
        fetchSong()
    }, [])

    async function fetchSong() {

        const searchParams = new URLSearchParams(window.location.search);
        const res = await (await fetch(`/api/song?url=${searchParams.get('url')}&id=${searchParams.get('id')}&nativeLanguage=en`)).json();
        if (res.status == 200) {
            setSong(res.song);
        }

    }
    return <>

        <button onClick={() => history.back()} className="my-8">
            <BackIcon />
        </button>

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