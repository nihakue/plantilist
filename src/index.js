import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const APP_IDS = [
  '5062285077887629204',
  '4921518846082296388',
  '5062286261992074595',
  '5062286413844761383',
  '5062286504991180539',
  '5062286581824539366',
  '5062292022103157698',
]

const appId = getRandom(APP_IDS);

window.PDK.init({
  appId,
  cookie: true
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
