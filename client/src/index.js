//render root componenet to the dom
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//first argument is dummy reducer now
//second argument is the starting or initial state of our application.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//two variables
//first one is out component, second one is where we are going to render it in dom.
//JSX tag, render expcet a component instance, which be created by JSX tags
ReactDom.render(
  //provider is redux components
  //everytime some data changes, provider will notify all child to update
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
