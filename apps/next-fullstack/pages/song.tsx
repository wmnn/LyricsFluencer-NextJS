import { useContext, useEffect, useState } from 'react';
import BackIcon from '../components/icons/BackIcon';
import Bar from '../components/songs/song/Bar';

export default function Song () {
    
    const [songContext, setSongContext]: any = useState({});

    useEffect(() => {
        console.log("Use Efefec")
        fetchSong()
    }, [])
    async function fetchSong() {
    
   
        const searchParams = new URLSearchParams(window.location.search);
        const res = await (await fetch(`/api/song?url=${searchParams.get('url')}&id=${searchParams.get('id')}&nativeLanguage=en`)).json();
        console.log(res)
        if (res.status == 200) {
            setSongContext(res.song);
        }
    }
    return <>

        <button onClick={() => history.back()} className="my-8">
            <BackIcon />
        </button>

        {
            songContext?.lyrics ? <>
                {songContext?.lyrics.map((bar: string, i) => {
                    return <>
                        <div key={i}>
                            <Bar bar={bar}/>
                            { 
                                songContext?.translation[i] ? 
                                    <p className='h-8 text-yellow-600'>{songContext?.translation[i]}</p>
                                : ''
                            }
                        </div>
                    </>
                })}
            </> : 'Loading'
        }
    
    </>
}