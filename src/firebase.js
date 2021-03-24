import firebase from 'firebase';
// import * as admin from 'firebase-admin';
// import firebaseAdmin from 'firebase-admin';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBl_90mMKRVK1R3v71Z0OgDchqu-Mumdts',
  authDomain: 'slack-clone-77dc8.firebaseapp.com',
  projectId: 'slack-clone-77dc8',
  storageBucket: 'slack-clone-77dc8.appspot.com',
  messagingSenderId: '201555591121',
  appId: '1:201555591121:web:32552096d01b9c34696af0',
  measurementId: 'G-TT5S4BHB5K',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const authAdmin = firebaseAdmin.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// const adminAuth = admin.auth();

// export { auth, provider, adminAuth };
export { auth, provider };
export default db;
