import * as firebase from 'firebase';
import 'firebase/firebase-firestore';
import 'firebase/firebase-database';
import 'firebase/firebase-storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBPxpJzqW_VC0gg_uf4JkLpVMQkTYKMtWo",
    authDomain: "envio-4a285.firebaseapp.com",
    databaseURL: "https://envio-4a285.firebaseio.com",
    projectId: "envio-4a285",
    storageBucket: "envio-4a285.appspot.com",
    messagingSenderId: "775744723822",
    appId: "1:775744723822:web:e2701605ba4ddb6341ff7f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var storage = firebase.storage();

export { firestore, storage };