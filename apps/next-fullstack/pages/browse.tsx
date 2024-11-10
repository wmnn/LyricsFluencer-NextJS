import React from 'react';
import ManualSearchForm from '../components/Index/ManualSearchForm'
import SongResults from '../components/Index/SongResults';
import PopularSongs from '../components/PopularSongs';
import SelectLearnedLanguageMenu from '../components/Index/SelectLearnedLanguageMenu';

function Browse() {

    return <>
        <SelectLearnedLanguageMenu />
        <ManualSearchForm />
        <SongResults />
        <PopularSongs />
    </>  
}

export default Browse;
