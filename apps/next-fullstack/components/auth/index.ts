import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { auth } from '@lyricsfluencer/firebase-client';
import { NextRouter } from "next/router";
import { signOut } from 'firebase/auth'

export async function handleProtectedRoute(router: NextRouter) {
    if (!auth.currentUser?.uid) {
        router.push('/');
    }
}

export function handleSignIn(email: string, password: string, router: NextRouter, setUserContext: any) {
    signInWithEmailAndPassword(auth, email, password).then(({user}) => {
        router.push("/")
    }).catch((error) => {
        alert(`Please contact admin: \n${error}`)
    })
}

export function userSignOut () {
    signOut(auth).then(() => {
        console.log('Signed out')
    }).catch(error => console.log(error))
}

export function handleAuthStateChange(setUserContext: any, router: NextRouter, getUserFromLocaleStorage: () => User) {

    /**
     * The need to load the user from locale storage, because if the use the previous value,
     * the user can't be loaded correctly from locale storage inside the user context.
     */
    onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed')
        if (user) {
            setUserContext(_ => ({
                ...getUserFromLocaleStorage(),
                id: user.uid
            }));
        } else {
            setUserContext(_ => ({
                ...getUserFromLocaleStorage(),
                id: null
            }));
        }
    })
}