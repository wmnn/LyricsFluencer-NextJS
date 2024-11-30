import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from 'lyricsfluencer/firebaseWebConfig.json'
export * from './authModel';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
