import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios';
import {Provider} from 'react-redux'
import store from './redux/store'
import dotenv from 'dotenv'
import './assets/styles/styles.css'
import './assets/styles/Card.css'

dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);