import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globalStyles.css';
import './styles/loginPage.css';
import './styles/welcomePage.css';
import './styles/header.css';
import './styles/posts.css';
import './styles/sideBar.css';
import './styles/homePage.css'
import './styles/inputs.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


