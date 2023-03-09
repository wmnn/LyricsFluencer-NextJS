import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const config = {
  apiKey: "AIzaSyDiYAfq9keMeXKRZxYSdnUtWwgPJCXR6YM",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORA GE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:193160037681:ios:dc03ee3574c5e386bd9c10",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(config);
export const auth = getAuth(app);
//export const auth = firebase.auth();