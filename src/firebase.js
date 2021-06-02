// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCkxS4LQFQi-0GuxE1iXV8MtgpVBQegSME",
    authDomain: "clone-eec94.firebaseapp.com",
    projectId: "clone-eec94",
    storageBucket: "clone-eec94.appspot.com",
    messagingSenderId: "498373666612",
    appId: "1:498373666612:web:d0275be32b975990cde761",
    measurementId: "G-Q9JPNZ3N18"
  };

  //Initialize the app 
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  //Initialize the database
  const db=firebaseApp.firestore();

  //Give variable that uses to authenticate
  const auth=firebase.auth()

  export { db , auth };
