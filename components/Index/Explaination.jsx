import React from 'react'

function Explaination() {
  return (
    <div className='space-y-4 py-2 flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>How does it work?</h1>
        <h2 className='text-2xl'>1. Search or recognize a song</h2>
        <img alt="Home" src={'/images/Search.png'} placeholder="blur" className='max-w-xs'/>
        <h2 className='text-2xl'>2. Add a word to your deck or google the meaning</h2>
        <img alt="Lyrics" src={'/images/LyricsMenu.png'} placeholder="blur" className='max-w-xs'/>
        <img alt="Google Meaning" src={'/images/GoogleMeaning.png'} placeholder="blur" className='max-w-xs'/>
        <img alt="Add to Deck" src={'/images/AddToDeck.png'} placeholder="blur" className='max-w-xs'/>    
        <h2 className='text-2xl'>3. Go to your decks and learn the added words</h2>
        <img alt="Decks" src={'/images/Decks.png'} placeholder="blur" className='max-w-xs'/>
        <img alt="Learning Card" src={'/images/Card_2.png'} placeholder="blur" className='max-w-xs'/> 
      </div> 
  )
}

export default Explaination