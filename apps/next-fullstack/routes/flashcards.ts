import express from 'express'
import { fetchingDecks, verifyToken } from '@lyricsfluencer/firebase-admin';
const router = express.Router()

router.get('/decks', async (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;
    
    const resData = {
        decks: await fetchingDecks(uid)
    }
    res.status(200);
    res.json(resData);
    
});

router.delete('/decks/', async (req, res) => {

    const resData = {
        status: 200
    }
    res.json(resData);
});

export default router;