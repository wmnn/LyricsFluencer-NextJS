const express = require('express')
const path = require('path')
const router = express.Router()
const musixmatch = require('@lyricsfluencer/musixmatch')
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})

router.post('/search', async (req, res) => {
    const data = await musixmatch.handleSearch(req.body.searchQuery);
    res.json({ status: 200, data: data });
});

router.post('/quicksearch', async (req, res) => {
    try {
        if (req.body.target) {
            const target = req.body.target;
            const data = await musixmatch.handleSearch(req.body.searchQuery);
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
        }
    } catch (err) {}
});

router.post('/selected', async (req, res) => {
    const scrapeURL = req.body.url;
    const targetLanguage = req.body.targetLanguage
    const lyrics = await musixmatch.getLyrics(scrapeURL);
    const translation = await handleTranslate(lyrics, targetLanguage)
    res.json({ status: 200, lyrics, translation});
});


async function handleTranslate(text, targetLanguage) {
    try {
        const res = await (await fetch('https://translation.googleapis.com/language/translate/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                q: text,
                key: process.env.GOOGLETRANSLATEAPIKEY,
                target: targetLanguage,
                format: 'text',
            }).toString(),
        })).json()
        
        return res.data.translations[0].translatedText;
    } catch (_) {
        return null
    }
}

module.exports = router