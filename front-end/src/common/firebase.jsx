// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPsPiwkUpddDpB0aQ7NSahN6XNn4Sysow',
  authDomain: 'kbsa-932f1.firebaseapp.com',
  projectId: 'kbsa-932f1',
  storageBucket: 'kbsa-932f1.appspot.com',
  messagingSenderId: '623651826426',
  appId: '1:623651826426:web:834bf79bff4e9b6b3f7743',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google authentication
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      throw error;
    });

  return user;
};
