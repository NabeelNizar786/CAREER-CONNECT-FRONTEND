import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdOKJz8t8uTYlnp8ciZ9IYMoKiCwYL9Fw",
  authDomain: "otp-app-demo-f35cb.firebaseapp.com",
  projectId: "otp-app-demo-f35cb",
  storageBucket: "otp-app-demo-f35cb.appspot.com",
  messagingSenderId: "2859707299",
  appId: "1:2859707299:web:ceb6b8b847c0ba3b61c816"
};

let Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);

export { Firebase, auth };
