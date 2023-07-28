import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwzAepxqFFwc19pvtaoO8yRqPbq_1cUkA",
  authDomain: "career-connect-otp.firebaseapp.com",
  projectId: "career-connect-otp",
  storageBucket: "career-connect-otp.appspot.com",
  messagingSenderId: "802223368984",
  appId: "1:802223368984:web:0b200d98ec953b27d38c6d"
};

let Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);

export { Firebase, auth };
