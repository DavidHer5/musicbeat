//Importaciones de Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";


//Constante de firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrFmZevjcX0ldb5avMXioVV3Wh4uBcrBY",
    authDomain: "musicbeat-2bddd.firebaseapp.com",
    projectId: "musicbeat-2bddd",
    storageBucket: "musicbeat-2bddd.appspot.com",
    messagingSenderId: "616604738081",
    appId: "1:616604738081:web:e77109f1ee3abf3c6ef960"
  };

  //Exportación de firebase para inicializar la App
  export default firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { auth, db };
  //export const db = getFirestore()

  
