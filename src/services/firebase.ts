import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqRoFgW6WgyEhRnTbrYpnjRbqy5FwMnR4',
  authDomain: 'workout-scoreboard.firebaseapp.com',
  projectId: 'workout-scoreboard',
  storageBucket: 'workout-scoreboard.appspot.com',
  messagingSenderId: '983256282987',
  appId: '1:983256282987:web:2231e8092cb743050ffe2e'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
