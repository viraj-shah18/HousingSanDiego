import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BrowserRouter as Router,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode> Need to comment this for GoogleMaps API to work
  <GoogleOAuthProvider clientId='79587116183-2c0475ucjimb51rn43pudi733p6kka30.apps.googleusercontent.com'>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>  
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
