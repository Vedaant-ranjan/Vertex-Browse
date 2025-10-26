
// FIX: Use a namespace import for the Firebase compat library. The initializeApp
// and auth functions are available directly on the imported namespace object.
// FIX: Changed the Firebase compat import from `* as firebase` to a default import. The `initializeApp` and `auth` functions are properties of the default export, not the module namespace.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPSOnjWnLpNDEtwqq31ABz7UNRb2r0FnM",
  authDomain: "vertex-browse.web.app",
  projectId: "vertex-browse",
  storageBucket: "vertex-browse.firebasestorage.app",
  messagingSenderId: "1050470575847",
  appId: "1:1050470575847:web:300a72591faf6ca5fd3c42",
  measurementId: "G-LF2D7YJ5D8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();