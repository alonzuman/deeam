import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpZv7J4Pv9XzoMWwvs656kOjEvUHt5imc",
  authDomain: "deeam-f0759.firebaseapp.com",
  projectId: "deeam-f0759",
  storageBucket: "deeam-f0759.appspot.com",
  messagingSenderId: "364835371153",
  appId: "1:364835371153:web:10ad2ba1a08c8f293b2730",
  measurementId: "G-E9P92ZTL9Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
