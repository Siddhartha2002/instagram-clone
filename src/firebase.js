import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACcVngr1JFtxpnlX5f6czW9UBO-B0KC9E",
  authDomain: "instagram-clone-a33d4.firebaseapp.com",
  projectId: "instagram-clone-a33d4",
  storageBucket: "instagram-clone-a33d4.appspot.com",
  messagingSenderId: "547626112365",
  appId: "1:547626112365:web:d54315dee99531eb277664",
  measurementId: "G-ZT1BYK3Q9P",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
