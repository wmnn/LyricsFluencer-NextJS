import React, { useEffect } from 'react';
import { auth } from '@lyricsfluencer/firebase-client';
import { onAuthStateChanged } from 'firebase/auth';
import QuickSearchForm from '../components/forms/QuickSearchForm';
import { Button } from '../components';
import { useRouter } from "next/router";
import DecksButton from '../components/Decks/DecksButton';

export default function Index() {

    const router = useRouter()

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
            listen();
        };
    }, []);


    return <div className='flex justify-center mt-24 flex-col gap-4'>
        <QuickSearchForm />
        <Button text={`Browse Songs`} handleClick={() => router.push('/browse')}/>
        <DecksButton />
    </div>    
}
