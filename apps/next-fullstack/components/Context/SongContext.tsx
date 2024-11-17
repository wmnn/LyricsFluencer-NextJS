import { createContext, useState } from 'react'
import type { Song } from '../types'


const SongContext = createContext<any>({isSongShown: false, lyrics: [], translation: [], song: null});

function SongContextProvider({children}) {
    const [songContext, setSongContext] = useState<SongContextType>({isSongShown: false, lyrics: [], translation: [], song: null})
    
    return (
        <SongContext.Provider value={{songContext, setSongContext}}>
            {children}
        </SongContext.Provider>
    )

}
export { SongContext, SongContextProvider }

export interface SongContextType {
    isSongShown: boolean,
    lyrics: string[],
    translation: string[],
    song: Song | null
}