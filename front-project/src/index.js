import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './components/Routing';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import { weatherReducer } from './reducers/reducer'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension' //using redux devtools to track state / actions
import { apiMiddleware } from 'redux-api-middleware';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : undefined

const store = createStore(weatherReducer, persistedState, composeWithDevTools(applyMiddleware(apiMiddleware)))

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Routing/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
