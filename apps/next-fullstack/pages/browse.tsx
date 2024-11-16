import React from 'react';
import ManualSearchForm from '../components/forms/ManualSearchForm'
import SongResults from '../components/songs/SongResults';
import PopularSongs from '../components/songs/PopularSongs';
import SelectLearnedLanguageMenu from '../components/SelectLearnedLanguageMenu';

function Browse() {

    return <>
        <SelectLearnedLanguageMenu />
        <ManualSearchForm />
        <SongResults />
        <PopularSongs />
    </>  
}

export default Browse;
