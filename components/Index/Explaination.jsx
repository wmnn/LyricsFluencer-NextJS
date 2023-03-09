import React from 'react'
import Image from 'next/image';
import {AddToDeck, Card, Card_2, Decks, EditCards, EditDeck, GoogleMeaning, Lyrics, LyricsMenu, Search} from '../../src/images/index';

function Explaination() {
  return (
    <div className='space-y-4 py-2 flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>How does it work?</h1>
        <h2 className='text-2xl'>1. Search or recognize a song</h2>
        <Image alt="leeerob" src={Search} placeholder="blur" className='max-w-xs'/>
        {/* <Image alt="leeerob" src={Lyrics} placeholder="blur" className='max-w-xs'/> */}
        <h2 className='text-2xl'>2. Add a word to your deck or google the meaning</h2>
        <Image alt="leeerob" src={LyricsMenu} placeholder="blur" className='max-w-xs'/>
        <Image alt="leeerob" src={GoogleMeaning} placeholder="blur" className='max-w-xs'/>
        <Image alt="leeerob" src={AddToDeck} placeholder="blur" className='max-w-xs'/>
        
        <h2 className='text-2xl'>3. Go to your decks and learn the added words</h2>
        <Image alt="leeerob" src={Decks} placeholder="blur" className='max-w-xs'/>
        {/* <Image alt="leeerob" src={Card} placeholder="blur" className='max-w-xs'/> */}
        <Image alt="leeerob" src={Card_2} placeholder="blur" className='max-w-xs'/>
        {/* <Image alt="leeerob" src={EditDeck} placeholder="blur" className='max-w-xs'/> */}
        {/* <Image alt="leeerob" src={EditCards} placeholder="blur" className='max-w-xs'/> */}
      </div> 
  )
}

export default Explaination