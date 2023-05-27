import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    axios.defaults.headers.common['Authorization'] = 'GMpMHZ3apRoj0Qr7d6T8eNLY';
    <App />
  </React.StrictMode>,
)
