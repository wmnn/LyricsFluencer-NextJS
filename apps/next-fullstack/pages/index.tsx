//@ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import { auth } from '@lyricsfluencer/firebase-client';
import { onAuthStateChanged } from 'firebase/auth';
// import { useRouter } from 'next/router';
import Song from '../components/Song'
import SongForm from '../components/SongForm'
import SongContext from '../components/Context/SongContext';
import SongResults from '../components/SongResults';

function Index() {
    // const router = useRouter();
    
    const [targetLanguage, setTargetLanguage] = useState('de');
    const {songContext, setSongContext}: any = useContext(SongContext);

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
            listen(); //on Unmount this will be called
        };
    }, []);


    return <div className='flex justify-center flex-col p-8'>
        { !songContext.isSongShown ? <>

            <SongForm setTargetLanguage={setTargetLanguage}></SongForm>
            <SongResults targetLanguage={targetLanguage}/>
            
        </> : <>

            <Song />   
                  
        </>}
    </div>    
}

export default Index;
