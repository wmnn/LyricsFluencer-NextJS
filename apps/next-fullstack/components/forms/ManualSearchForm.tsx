import { useContext } from 'react'
import { ResultSongsContext } from '../context/ResultSongsContext';
import { ManualSearchResponse } from '../types';
import SelectNativeLanguageMenu from '../SelectNativeLanguageMenu';
import SearchForm from './SearchForm';

export default function ManualSongForm() {

    const {_, setResultSongsContext}: any = useContext(ResultSongsContext);
    
    async function handleSearch(e: React.ChangeEvent<HTMLFormElement>, query: string) {
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

    return <> 

        <div className="flex flex-col">
            <SelectNativeLanguageMenu />
            <SearchForm handleSearch={handleSearch} buttonText={`Show results`}/>
        </div>

    </>
}