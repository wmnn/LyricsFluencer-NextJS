//@ts-nocheck
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '@lyricsfluencer/firebaseServiceAccount.json'
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
export async function deleteUser(uid){
    ref = db.collection("users").doc(uid)
    deleteDocumentAndSubcollections(ref)
    ref = db.collection("flashcards").doc(uid)
    deleteDocumentAndSubcollections(ref)

    admin.auth().deleteUser(uid)
        .then(() => {
            console.log('User deleted successfully.');
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