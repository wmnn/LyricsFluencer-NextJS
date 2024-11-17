import React, { useContext } from "react"
import { ResultSongsContext } from '../context/ResultSongsContext';
import { Song } from "../types";
import SongResult from "./SongResult";

function SongResults() {

    const {resultSongsContext, setResultSongsContext}: any = useContext(ResultSongsContext);

    return <>
    
    <div className='flex flex-col gap-2 mt-8'>
        {resultSongsContext?.map((song: Song, i) => 
            <SongResult song={song} key={i}/>
        )}
    </div>
    
    </>
}

export default SongResults