import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, test} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4rS05rZ5SLLPTevpBkMVGw6s0uoWsId0",
  authDomain: "evaluacion-modulo5-54f60.firebaseapp.com",
  projectId: "evaluacion-modulo5-54f60",
  storageBucket: "evaluacion-modulo5-54f60.firebasestorage.app",
  messagingSenderId: "661384263671",
  appId: "1:661384263671:web:9ebcead400b8ee6129a0f2"
};

console.log("Valor de configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
  console.log('Firebase initialized successfully');
} else {
  console.log('Firebase initialization failed');
}

const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly');
} else {
  console.log('Firestore initialization failed');
}

export { database };