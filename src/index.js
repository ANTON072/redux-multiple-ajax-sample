import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './App';
import * as ActionTypes from './actions';

const initialState = {
  apis: {},
  user: {},
  loading: false
};

// Reducers
const github = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXAMPLE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_EXAMPLE_FAILURE:
      return { ...state, loading: false };
    case ActionTypes.FETCH_EXAMPLE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ github }),
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
