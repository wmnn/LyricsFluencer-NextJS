import express from 'express'
import { createDeck, deleteCard, fetchingDecks, handleAddToDeck, handleDeleteDeck, updateCard, verifyToken } from '@lyricsfluencer/firebase-admin';
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

/**
 * Endpoint in order to create a new deck
 */
router.post('/decks', async (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;
    
    const resData = {
        deck: await createDeck(uid, req.body.deckName)
    }
    res.status(200);
    res.json(resData);
    
});

router.delete('/decks', async (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;

    const deckName = req.body.deckName;

    if ((await handleDeleteDeck(uid, deckName)) == deckName) {
        res.status(200)
        res.json({})
        return;
    }

    res.status(500)
    res.json({})
});

router.post('/decks/cards', async (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;

    const deckName = req.body.deckName;
    const card = req.body.card;
    if (Object.keys(card).length !== 2 || !Object.hasOwn(card, 'front') || !Object.hasOwn(card, 'back')) {
        res.status(400)
        res.json({})
        return;
    }

    const newCard = await handleAddToDeck(uid, deckName, card);
    if (Object.keys(newCard).length > 2) {
        res.status(200)
        res.json({ card: newCard })
    } else {
        res.status(400)
        res.json({})
    }
    
})

router.patch('/decks/cards', async (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;

    const deckName = req.body.deckName;
    const card = req.body.card;
    await updateCard(uid, deckName, card);
    res.status(200)
    res.json({ card })

})

router.delete('/decks/cards', async (req,res) => {

    const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    if (!token) return;
    const { uid } = await verifyToken(token);
    if (!uid) return;

    const deckName = req.body.deckName;
    const cardId = req.body.id;
    await deleteCard(uid, deckName, cardId);
    res.status(200)
    res.json({})
})

export default router;