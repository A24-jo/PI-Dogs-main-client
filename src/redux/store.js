import { applyMiddleware, createStore,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduserBreed from './reducer';

// Corrige el nombre de la variable a __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const ComposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reduserBreed,
  ComposeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
