import express from 'express'
import * as musixmatch from '@lyricsfluencer/musixmatch'
// @ts-ignore  
import { handleTranslate } from '@lyricsfluencer/googletranslate'
const router = express.Router()

router.post('/search', async (req, res) => {
    const data = await musixmatch.handleSearch(req.body.searchQuery);
    res.json({ status: 200, data: data });
});

router.post('/quicksearch', async (req, res) => {
    try {
        if (!req.body.target || !res.body.searchQuery ) return res.json({ status: 400 })

        const target = req.body.target
        const query = req.body.searchQuery
        const data = await musixmatch.handleSearch(query);
        const artist = data.message.body.track_list[0].track.artist_name;
        const song = data.message.body.track_list[0].track.track_name;

        const scrapeURL = data.message.body.track_list[0].track.track_share_url.split('?')[0];

        var lyrics = await musixmatch.getLyrics(scrapeURL);
        const translatedLyrics = await handleTranslate(lyrics, target);

        return res.json({
            status: 200,
            artist: artist,
            song: song,
            lyrics: lyrics,
            translatedLyrics: translatedLyrics,
        });
        
    } catch (err) {}
});

router.post('/selected', async (req, res) => {
    const scrapeURL = req.body.url;
    const targetLanguage = req.body.targetLanguage
    const lyrics = await musixmatch.getLyrics(scrapeURL);
    const translation = await handleTranslate(lyrics, targetLanguage)
    res.json({ status: 200, lyrics, translation});
});


export default router;