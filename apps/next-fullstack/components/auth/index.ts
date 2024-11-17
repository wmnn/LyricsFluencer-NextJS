import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@lyricsfluencer/firebase-client';
import { NextRouter } from "next/router";
import { signOut } from 'firebase/auth'

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

export function handleAuthStateChange(setUserContext: any, router: NextRouter) {

    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserContext(prev => ({
                id: user.uid,
                ...prev
            }));
        } else {
            setUserContext(prev => ({
                id: null,
                ...prev
            }));
        }
    })
}