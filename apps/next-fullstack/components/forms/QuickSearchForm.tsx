import { useContext, useState } from 'react'
import { useRouter } from "next/router";
import { ResultSongsContext } from '../context/ResultSongsContext';
import { SongContext } from '../context/SongContext';
import { UserContext } from '../context/UserContext';
import { ManualSearchResponse, QuickSearchResponse } from '../types';
import SelectNativeLanguageMenu from '../SelectNativeLanguageMenu';
import SearchForm from './SearchForm';

export default function QuickSearchForm() {

    const router = useRouter()
    const {_, setResultSongsContext}: any = useContext(ResultSongsContext);
    const {songContext, setSongContext}: any = useContext(SongContext);
    const {userContext, setUserContext}: any = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleSearch(e: React.ChangeEvent<HTMLFormElement>, query: string) {
        e.preventDefault();
        setIsLoading(true);


        const res : QuickSearchResponse = await (await fetch('/api/quicksearch', {
            method: 'POST',
            body: JSON.stringify({
                searchQuery: query,
                target: userContext?.nativeLanguage ?? 'DE'
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })).json()

        setIsLoading(false);

        if (res.status == 200) {
            setSongContext(res.song);
            router.push(`/song`)
        }
        
    }

    return <> 

        <div className="flex flex-col">
            <SelectNativeLanguageMenu />
            <SearchForm handleSearch={handleSearch} buttonText={`Quick search`} isLoading={isLoading}/>
        </div>

    </>
}