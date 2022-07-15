import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/index";
import axios from 'axios';
import dotenv from "dotenv";
import { Auth0Provider} from "@auth0/auth0-react";
// const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;

dotenv.config();

console.log(process.env);

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Auth0Provider domain="dev-aekjy-pn.us.auth0.com" clientId='UjHJFDsvnCH76oJI91l7vLGajVfeBoF7' redirectUri="https://ki-games.vercel.app/home">
  <Provider store={store}> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
