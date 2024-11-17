import { useContext } from 'react';
import { SongContext } from '../context/SongContext';

function Song() {

    const {songContext, _}: any = useContext(SongContext);

    return <>

        <button onClick={() => history.back()} className="my-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path /*strokeLinecap="round" strokeLinejoin="round"*/ d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </button>


        {
            songContext.lyrics ? <>
                {songContext.lyrics!.map((_, i) => {
                    return <div key={i}>
                        <p className='h-8'>{songContext.lyrics[i]}</p>
                            { 
                                songContext.translation[i] ? 
                                    <p className='h-8 text-yellow-600'>{songContext.translation[i]}</p>
                                : ''
                            }
                    </div>         
                  
                })}
            </> : 'Some error occured'
        }
    
    </>
} 
export default Song;