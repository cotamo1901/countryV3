import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios';
import {Provider} from 'react-redux'
import reportWebVitals from "./reportWebVitals";
import store from './redux/store'
import dotenv from 'dotenv'
import './assets/styles/styles.css'
import './assets/styles/Card.css'
import './assets/styles/Form.css'



dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>{" "}
      ,
    </React.StrictMode>,
    document.getElementById("root")
  );
  reportWebVitals();