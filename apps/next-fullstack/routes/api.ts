import express from 'express'
import * as musixmatch from '@lyricsfluencer/musixmatch'
// @ts-ignore  
import { handleTranslate } from '@lyricsfluencer/googletranslate'
import { SelectedSongRequest, SelectedSongResponse } from '../types';
const router = express.Router()

router.post('/search', async (req, res) => {
    const songs = await musixmatch.handleSearch(req.body.searchQuery);
    res.json({ status: 200, songs });
});

router.post('/quicksearch', async (req, res) => {
    try {
        if (!req.body.target || !res.body.searchQuery ) return res.json({ status: 400 })

        const target = req.body.target
        const query = req.body.searchQuery

        const songs = await musixmatch.handleSearch(query);
        const song = await musixmatch.getLyrics(songs[0]);
        if (song.lyrics && song.lyrics.length !== 0) {
            song.translation = await handleTranslate(song.lyrics, target);
        }

        return res.json({
            status: 200,
            song: song,
        });
        
    } catch (err) {}
});

router.post('/selected', async (req, res) => {
    const reqData: SelectedSongRequest = req.body;

    let song = reqData.song
    const targetLanguage = reqData.targetLanguage

    song = await musixmatch.getLyrics(song);
    song.translation = await handleTranslate(song.lyrics, targetLanguage)

    const resData: SelectedSongResponse = {
        status: 200,
        song
    }
    res.json(resData);
});


export default router;