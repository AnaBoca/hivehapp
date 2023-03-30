// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBuoM0hc8_6aNFcau7O9HhaCEI7Zb3g72Y',
  authDomain: 'hivehapp.firebaseapp.com',
  projectId: 'hivehapp',
  storageBucket: 'hivehapp.appspot.com',
  messagingSenderId: '785435228537',
  appId: '1:785435228537:web:e12ee8e177757501bc17a8',
  measurementId: 'G-L4P4DVC6K4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBuoM0hc8_6aNFcau7O9HhaCEI7Zb3g72Y',
    authDomain: 'hivehapp.firebaseapp.com',
    projectId: 'hivehapp',
    storageBucket: 'hivehapp.appspot.com',
    messagingSenderId: '785435228537',
    appId: '1:785435228537:web:e12ee8e177757501bc17a8',
    measurementId: 'G-L4P4DVC6K4',
  },
};
