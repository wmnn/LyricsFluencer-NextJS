import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_Ssvh1CMWtty0h1BMF2OUWmF0hkmC-t8",
  authDomain: "lyricsfluencer.firebaseapp.com",
  projectId: "lyricsfluencer",
  storageBucket: "lyricsfluencer.appspot.com",
  messagingSenderId: "274157526278",
  appId: "1:274157526278:web:6b5158bcd01410c2a69287"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
