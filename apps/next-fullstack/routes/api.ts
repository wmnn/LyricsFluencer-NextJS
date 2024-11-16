import express from 'express'
import * as musixmatch from '@lyricsfluencer/musixmatch'
// @ts-ignore  
import { handleTranslate } from '@lyricsfluencer/googletranslate'
import { SelectedSongRequest, SelectedSongResponse, Song } from '../components/types';
const router = express.Router()

router.post('/search', async (req, res) => {
    const songs = await musixmatch.handleSearch(req.body.searchQuery);
    res.json({ status: 200, songs });
});

router.post('/popular', async (req, res) => {
    // TODO get targetLanguageCode from firestore
    req.body.targetLanguage = "DE"
    console.log(req.body)
    const songs = await musixmatch.getPopularSongs(req.body.targetLanguageCode);
    res.json({ status: 200, songs });
});

router.post('/quicksearch', async (req, res) => {
    try {
        if (!req.body.target || !req.body.searchQuery ) return res.json({ status: 400 })

        console.log(req.body)
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

    let song;
    if (typeof reqData.song === 'string') {
        try {
            song = JSON.parse(reqData.song);
        } catch (err) {
            return res.status(400).json({ error: 'Invalid song data' });
        }
    } else if (typeof reqData.song === 'object') {
        song = reqData.song;
    } else {
        return res.status(400).json({ error: 'Song data must be an object or string' });
    }
    const nativeLanguage = reqData.nativeLanguage ?? "DE"

    song = await musixmatch.getLyrics(song);
    song.translation = await handleTranslate(song.lyrics, nativeLanguage)

    const resData: SelectedSongResponse = {
        status: 200,
        song
    }
    res.json(resData);
});
router.get('/song', async (req, res) => {
    
    if (!req.query.id || !req.query.url || !req.query.nativeLanguage) {
        return res.status(400);
    }
    const id = req.query.id;
    const url = req.query.url;
    const nativeLanguage = req.query.nativeLanguage;

    let reqSong: Song = {
        id,
        url,
        name: '',
        artist: ''
    }

    const song = await musixmatch.getLyrics(reqSong);
    song.translation = await handleTranslate(song.lyrics, nativeLanguage)

    const resData: SelectedSongResponse = {
        status: 200,
        song
    }
    res.json(resData);
});


export default router;