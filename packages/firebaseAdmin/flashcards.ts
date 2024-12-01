import admin from 'firebase-admin';
import { db } from './firebase'

// Create a new deck
async function createDeck(uid, deckName) {
  
    const deckRef = db.collection('flashcards').doc(uid).collection('decks').doc(deckName);
    const userDocRef = db.collection('flashcards').doc(uid);

    try {
        const userDoc = await userDocRef.get();

        const data = {
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        if (userDoc.exists) {
            // Document exists, just add the deck
            await deckRef.set(data, { merge: true });
        } else {
            // Document doesn't exist, create it and then add the deck
            await userDocRef.set(data);
            await deckRef.set(data, { merge: true });
        }

        const deck = { deckName, cards: [] };
        return deck;

    } catch (error) {
        console.error('Error creating deck:', error);
    }
}

// Fetch all decks for a given user and the cards for each deck
async function fetchingDecks(uid) {
    try {
        // Fetch all decks for the user from the 'flashcards' collection
        const decksSnapshot = await db.collection('flashcards').doc(uid).collection('decks').get();
        
        // Map over the decks to fetch their cards
        const decks = [];
        for (const doc of decksSnapshot.docs) {
            const deckName = doc.id;  // The document ID is used as the deck name
            const deckRef = doc.ref;  // Get the reference to the deck document
            const cards = await getCards(deckRef);  // Fetch cards for the deck
            decks.push({
                deckName,
                cards,
            });
        }
    
        return decks;  // Return all decks with their cards
    } catch (error) {
        console.error('Error fetching decks:', error);
        return [];  // Return an empty array in case of an error
    }
}
  
// Get all cards from a specific deck
async function getCards(deckRef) {
    try {
        // Fetch all cards from the 'cards' subcollection
        const cardsSnapshot = await deckRef.collection('cards').get();
        const cards = cardsSnapshot.docs.map(doc => ({
            id: doc.id,  // Get the document ID for each card
            ...doc.data(),  // Get the card data
        }));
        return cards;  // Return an array of cards
    } catch (error) {
        console.error('Error getting cards:', error);
        return [];  // Return an empty array in case of an error
    }
}

// Add a card to a deck
async function handleAddToDeck(uid, deckName, card) {

    const deckRef = db.collection('flashcards').doc(uid).collection('decks').doc(deckName).collection('cards');
    try {
        const newCard = {
            ...card,
            interval: 0,
            due: new Date().toISOString()
        };
        const docRef = await deckRef.add(newCard);
        newCard.id = docRef.id
        return newCard;

    } catch (error) {
        console.error('Error adding card:', error);
        return card;
    }
}

// Delete a deck and all its cards
async function handleDeleteDeck(uid, deckName) {

    const deckRef = db.collection('flashcards').doc(uid).collection('decks').doc(deckName);
    const cardsRef = db.collection('flashcards').doc(uid).collection('decks').doc(deckName).collection('cards');

    try {
        // Delete all cards in the deck
        const cardsSnapshot = await cardsRef.get();
        const batch = db.batch();

        cardsSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        // Delete the deck document itself
        batch.delete(deckRef);
        await batch.commit();
        return deckName;

    } catch (error) {
        console.error('Error deleting deck:', error);
    }
}

// Update a card in a specific deck
async function updateCard(uid, deckName, updatedCard) {
    const cardRef = db
        .collection('flashcards')
        .doc(uid)
        .collection('decks')
        .doc(deckName)
        .collection('cards')
        .doc(updatedCard.id);

    try {
        await cardRef.set({
            front: updatedCard.front,
            back: updatedCard.back,
            interval: updatedCard.interval,
            due: updatedCard.due
        }, { merge: true });  // Merge with existing data to avoid overwriting other fields
        return updatedCard;
    } catch (error) {
        console.error('Error updating card:', error);
        return null;  // Return null if there's an error
    }
}
// Delete a card from a specific deck
async function deleteCard(uid, deckName, cardId) {
    const cardRef = db
        .collection('flashcards')
        .doc(uid)
        .collection('decks')
        .doc(deckName)
        .collection('cards')
        .doc(cardId);

    try {
        await cardRef.delete();
        return true;  // Return true if deletion is successful
    } catch (error) {
        console.error('Error deleting card:', error);
        return false;  // Return false if there's an error
    }
}

// Export functions to use in other modules
export {
  createDeck,
  fetchingDecks,
  handleAddToDeck,
  handleDeleteDeck,
  updateCard, 
  deleteCard
};
