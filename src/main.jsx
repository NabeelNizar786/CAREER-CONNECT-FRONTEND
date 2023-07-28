import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <GoogleOAuthProvider clientId="896978492968-vs7q1gle5hd3gpk47pkr494eabh06mfg.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </Provider>
)
