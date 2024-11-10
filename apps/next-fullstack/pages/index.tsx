import React, { useEffect, useState, useContext } from 'react';
import { auth } from '@lyricsfluencer/firebase-client';
import { onAuthStateChanged } from 'firebase/auth';
import QuickSearchForm from '../components/Index/QuickSearchForm';
import { Button } from '../components';
import { useRouter } from "next/router";

function Index() {

    const router = useRouter()
    const [nativeLanguage, setNativeLanguage] = useState('de');

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


    return <div className='flex justify-center mt-24 flex-col gap-8'>
        <QuickSearchForm />
        <Button text={`Browse Songs`} handleClick={() => router.push('/browse')}/>
    </div>    
}

export default Index;
