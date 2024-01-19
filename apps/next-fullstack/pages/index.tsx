import React, { useEffect, useState } from 'react';
import { auth } from '../src/util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { languages } from '../staticData';
import Input from '../components/Input';
import Button from '../components/Button';

function Index() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [song, setSong] = useState<Song>({});
    const [isSongShown, setIsSongShown] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState('de');
    const [isSelectLanguagePopupShown, setIsSelectLanguagePopupShown] = useState(false);
    const [lyrics, setLyrics] = useState([]);
    const [translation, setTranslation] = useState([]);

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

        setSongs(data.message.body.track_list);
    }

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
            setSong(song);
            setLyrics(data.lyrics.split('\n'))
            setTranslation(data.translation.split('\n'))
            setIsSongShown(!isSongShown);
        }
    }

    async function handleSelectedLanguage(lang) {
        setTargetLanguage(lang.language)
        setIsSelectLanguagePopupShown(false);
    }

    return (

        <div className='flex justify-center flex-col p-8'>
            { !isSongShown ? <>

                <label>Target language</label>
                <Button 
                    type="button" 
                    text={languages.filter((lang) => lang.code == targetLanguage)[0].name}
                    handleClick={() => setIsSelectLanguagePopupShown((prev) => !prev)}
                />

                {
                    isSelectLanguagePopupShown ? <>
                        {languages.map((lang, i) => 
                            <button onClick={() => handleSelectedLanguage(lang)} className='my-4 text-l'>
                                {lang.name}
                            </button>
                        )}
                    </> : ''
                }

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
                    songs?.map((song, i) => 
                        <button onClick={() => handleSelectedSong(song)} className='my-8 border-2 rounded-xl' key={i}>
                            <p>Artist: {song.track.artist_name}</p>
                            <p>Song: {song.track.track_name}</p>
                            <p>Album: {song.track.album_name}</p>
                        </button>
                    )
                }
                </div>
            
                </>
                :
                //Song is shown
                <>
                    <button onClick={() => setIsSongShown(!isSongShown)} className="my-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>

            
                    {lyrics.length == translation.length ? <>
                        {lyrics?.map((line, i) => {

                            return <>
                                 <p className='h-8'>{lyrics[i]}</p>
                                 <p className='h-8 text-yellow-600'>{translation[i]}</p>
                            </>

                        })}
                    </>
                    : 'Some error occured'}            
                </>


            }
            
        </div>
        
    );
}

export default Index;
