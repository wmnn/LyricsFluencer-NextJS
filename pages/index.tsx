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

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('Logged in Request plan');
                //@ts-ignore
                const url = `${root}/payment/plan?token=${user.accessToken}`;
                console.log(url);
                const json = await (await fetch(url)).json()
        
                console.log('Checked Plan');
                console.log(json);
                json.subscriptionPlan == 'free' ? router.push('/onboarding/plans') : router.push('/settings');
            }
        });
        return () => {
            //on Unmount this will be called
            listen();
        };
    }, []);

    async function handleSearch(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(
            (await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify({
                    searchQuery: query
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            
            }))
        )
        
        fetch('http://localhost:3000/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                searchQuery: query 
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response data here
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });

    }

    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSearch} className='w'>
                
                <label>Search</label>
                <Input 
                    type={'text'} 
                    value={query} 
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {setQuery(e.target.value)}}
                />
                <Button type={'submit'} text={'Search'}/>
            </form>

        </div>
    );
}

export default Index;
