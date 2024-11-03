import { useContext, useState } from 'react'
import ResultSongsContext from './Context/ResultSongsContext';
import { languages } from '../staticData';
import { Button, Input } from './'
import { ManualSearchResponse } from '../types';

function SongForm({ setTargetLanguage }) {

    const [query, setQuery] = useState('');
    const {_, setResultSongsContext}: any = useContext(ResultSongsContext);
    
    async function handleSearch(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const res : ManualSearchResponse = await (await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({
                searchQuery: query
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        setResultSongsContext(res.songs);
    }

    async function handleSelectedLanguage(langCode) {
        setTargetLanguage(langCode)
    }

    return <> 

    <div className="flex flex-col lg:w-[50%] lg:ml-[25%]">

        <label className=" text-gray-600">Target language</label>

        <select name="languages" id="languages" className={'pl-4 pr-4 pt-2 pb-2 text-lg border-gray-200 border-[1px] hover:bg-gray-200 transition-all w-min text-center rounded-md shadow-xl hover:cursor-pointer text-black'} onChange={(e) => handleSelectedLanguage(e.target.value)}>
            {languages.map((lang, i) => 
                    <option key={i} value={lang.code}>{lang.name}</option>
            )}
        </select>

        <form onSubmit={handleSearch} className='mt-4'>
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
                <p>Search</p>
            </>
            }>
               
            </Button>
        </form>
                    
    </div>

    </>
}
export default SongForm