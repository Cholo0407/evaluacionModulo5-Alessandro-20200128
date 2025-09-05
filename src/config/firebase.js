// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <- Esta línea faltaba

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4rS05rZ5SLLPTevpBkMVGw6s0uoWsId0",
  authDomain: "evaluacion-modulo5-54f60.firebaseapp.com",
  projectId: "evaluacion-modulo5-54f60",
  storageBucket: "evaluacion-modulo5-54f60.firebasestorage.app",
  messagingSenderId: "661384263671",
  appId: "1:661384263671:web:9ebcead400b8ee6129a0f2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const database = getFirestore(app);

// Exportar
export { auth, database };