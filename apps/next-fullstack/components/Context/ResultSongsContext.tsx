import { createContext, useState } from 'react'

const ResultSongsContext = createContext<any>([]);

function ResultSongsContextProvider({children}) {

    const [resultSongsContext, setResultSongsContext] = useState<Array<any>>([])

    return (
        <ResultSongsContext.Provider value={{resultSongsContext, setResultSongsContext}}>
            {children}
        </ResultSongsContext.Provider>
    )
}
export { ResultSongsContext, ResultSongsContextProvider }