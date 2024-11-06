//@ts-nocheck
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from 'lyricsfluencer/firebaseServiceAccount.json'
import admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const db = getFirestore()


export async function verifyToken(token){
    try{
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            //console.log(decodeValue)
            return { uid: decodeValue.uid, email: decodeValue.email } 
        }else{
            return null
        }
    }catch(e){

    }
}
/**
 * Deletes the firebase user and firestore documents
 * @param uid user unique id
 */
export async function deleteUser(uid){

    let ref
    ref = db.collection('users').doc(uid)
    deleteDocumentAndSubcollections(ref)
    ref = db.collection('flashcards').doc(uid)
    deleteDocumentAndSubcollections(ref)

    admin.auth().deleteUser(uid)
        .then(() => {
            console.log(`User ${uid} deleted successfully.`);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
    });

}
async function deleteDocumentAndSubcollections(ref) {
    
    // Get all subcollections of the document
    const subcollections = await ref.listCollections();
    // Delete all subcollections recursively
    for (const subcollection of subcollections) {
        await deleteCollection(subcollection);
    }
    // Delete the document
    await ref.delete();
    
}

// Utility function to delete all documents in a collection
async function deleteCollection(collectionRef: CollectionReference): Promise<void> {
    const snapshot: QuerySnapshot = await collectionRef.get();
    const batch = firestore.batch();

    // Delete each document in the collection
    snapshot.forEach((doc: DocumentSnapshot) => {
        batch.delete(doc.ref);
    });

    // Commit the batch operation to delete documents
    await batch.commit();
}