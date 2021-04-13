import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAy7DCJogShUAZUTBoZuPcQdC5Hwc3yCYk",
  authDomain: "image-tagging-5f979.firebaseapp.com",
  projectId: "image-tagging-5f979",
  storageBucket: "image-tagging-5f979.appspot.com",
  messagingSenderId: "59235774863",
  appId: "1:59235774863:web:0e80c4eff3b61ef77edbfa"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);