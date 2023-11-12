import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmSCd_q9dADutjRjlXRnLj4RPBIeHyXyc",
  authDomain: "chat-app-3406f.firebaseapp.com",
  projectId: "chat-app-3406f",
  storageBucket: "chat-app-3406f.appspot.com",
  messagingSenderId: "1076954410914",
  appId: "1:1076954410914:web:03ab54cb9cee0b76070cfb",
  measurementId: "G-7RWBHL51VM",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
