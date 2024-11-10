import { useContext } from 'react';
import SongContext from '../components/Context/SongContext';
import BackIcon from '../components/icons/BackIcon';
import Bar from '../components/Song/Bar';

export default function Song () {
    
    const {songContext, _}: any = useContext(SongContext);

    return <>

        <button onClick={() => history.back()} className="my-8">
            <BackIcon />
        </button>

        {
            songContext?.lyrics ? <>
                {songContext?.lyrics.map((bar: string, i) => {
                    return <>
                            <Bar bar={bar}/>

                            { 
                                songContext?.translation[i] ? 
                                    <p className='h-8 text-yellow-600'>{songContext?.translation[i]}</p>
                                : ''
                            }
                            
                    </>
                })}
            </> : 'Some error occured'
        }
    
    </>
}