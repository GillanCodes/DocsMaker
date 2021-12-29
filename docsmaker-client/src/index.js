import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { getDocs } from './actions/docs.action';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getDocs());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);