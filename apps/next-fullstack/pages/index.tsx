import React, { useEffect, useState } from 'react';
import { auth } from '../src/util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { root } from '../staticData';
import Input from '../components/Input';
import Button from '../components/Button';

function Index() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [isSongShown, setIsSongShown] = useState(false);
    const [song, setSong]: any = useState({});

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                
                //@ts-ignore
                // const url = `${root}/payment/plan?token=${user.accessToken}`;
                // console.log(url);
                // const json = await (await fetch(url)).json()
        
                // console.log('Checked Plan');
                // console.log(json);
                // json.subscriptionPlan == 'free' ? router.push('/onboarding/plans') : router.push('/settings');
            }
        });
        return () => {
            //on Unmount this will be called
            listen();
        };
    }, []);

    async function handleSearch(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const { data } = await (await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({
                searchQuery: query
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        console.log(data);

        setSongs(data.message.body.track_list);
    }

    async function handleSelectedSong(song) {
        console.log(song)

        const data = await (await fetch('/api/selected', {
            method: 'POST',
            body: JSON.stringify({
                url: song.track.track_share_url
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        console.log(data);

        if (data.lyrics) {
            setSong(data);
            setIsSongShown(!isSongShown);
        }
    
    }

    return (

        <div className='flex justify-center flex-col p-8'>
            { !isSongShown ? <>

                <form onSubmit={handleSearch} className=''>
                <label>Search for Song</label>
                <Input 
                    type={'text'} 
                    value={query} 
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {setQuery(e.target.value)}}
                />
                <Button type={'submit'} text={'Search'} width={'w-full'}/>
                </form>



                <div className='flex flex-col'>
                {
                    songs.map((song) => 

                    <>
                        <button onClick={() => handleSelectedSong(song)} className='my-8 border-2 rounded-xl'>
                            <p>Artist: {song.track.artist_name}</p>
                            <p>Song: {song.track.track_name}</p>
                            <p>Album: {song.track.album_name}</p>
                        </button>
                            
                    </>)
                }
                </div>
            
                </>
                :
                <>
                    <button onClick={() => setIsSongShown(!isSongShown)} className="my-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>

                    {song.lyrics.split('\n').map(line => <>
                        <p className='h-8'>{line}</p>

                    </>)}
                
                </>


            }
            
            
        
        </div>
        
  
       
    );
}

export default Index;
