import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Firebase burada kurulur

const firebaseConfig = {
  apiKey: "AIzaSyBsT-oavDN2uG8O54C5mQ4v2RYSy-cFUyM",
  authDomain: "emlak-otomasyonu-5585f.firebaseapp.com",
  projectId: "emlak-otomasyonu-5585f",
  storageBucket: "emlak-otomasyonu-5585f.appspot.com",
  messagingSenderId: "913309590036",
  appId: "1:913309590036:web:2022122eb1f1fbcc22bd01",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
