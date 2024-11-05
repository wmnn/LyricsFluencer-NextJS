//@ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import { auth } from '@lyricsfluencer/firebase-client';
import { onAuthStateChanged } from 'firebase/auth';
// import { useRouter } from 'next/router';
import Song from '../components/Index/Song'
import SongForm from '../components/Index/SongForm'
import SongContext from '../components/Context/SongContext';
import SongResults from '../components/Index/SongResults';

function Index() {
    // const router = useRouter();
    
    const [nativeLanguage, setNativeLanguage] = useState('de');
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

            <SongForm setNativeLanguage={setNativeLanguage}></SongForm>
            <SongResults nativeLanguage={nativeLanguage}/>
            
        </> : <>

            <Song />   
                  
        </>}
    </div>    
}

export default Index;
