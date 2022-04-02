import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import homeBackground from './Assets/homeBackground.png'

ReactDOM.render(
  <React.StrictMode>
    <div className='appScreenContainer' style={{ backgroundImage: `url(${homeBackground})` }} >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);