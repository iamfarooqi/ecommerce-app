import { initializeApp } from '@react-native-firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyCzbzocgyHYbsCZOl3THtuqMl7fF_qDt_c",
    authDomain: "ecommerce-app-2e410.firebaseapp.com",
    projectId: "ecommerce-app-2e410",
    storageBucket: "ecommerce-app-2e410.appspot.com",
    messagingSenderId: "910631213556",
    appId: "1:910631213556:web:533ae0f26c0093f134c1a1"
};


const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
