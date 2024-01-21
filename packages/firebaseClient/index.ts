import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//@ts-ignore
import firebaseConfig from 'lyricsfluencer/firebaseWebConfig.json'

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
