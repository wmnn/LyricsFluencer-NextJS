import SongPopup from "./SongPopup";

export default function Word({word}) {

    return <>
        <div className='h-8 hover:text-blue-500 group relative'>
            <p className="hover:text-blue-600">{word}</p>
            <div className="hidden group-hover:block absolute bottom-[30px]">
                <SongPopup word={word} />
            </div>
        </div>



    </>
}