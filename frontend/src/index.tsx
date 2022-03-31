import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <div className='appScreenContainer' style={{ backgroundImage: `url(https://i.imgur.com/ZzIuDJ5.png)` }} >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);