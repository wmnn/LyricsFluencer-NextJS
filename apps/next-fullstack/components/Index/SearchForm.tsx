import { useState } from 'react'
import { Button, Input } from '..'

export default function SearchForm({ handleSearch, buttonText }) {

    const [query, setQuery] = useState('');

    return <> 
        <form onSubmit={(e) => handleSearch(e, query)} className='mt-4'>
            <label className=" text-gray-600">Search for Song</label>
            <Input 
                type={'text'} 
                value={query} 
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {setQuery(e.target.value)}}
            />
            <div className="mt-4"/>
            <Button type={'submit'} text={<>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[14px] w-[14px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <p>{buttonText}</p>
            </>
            }>               
            </Button>
        </form>
    </>
}