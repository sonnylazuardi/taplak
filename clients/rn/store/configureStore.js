import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('taplak');
const reduxStorage = storage.createMiddleware(engine);

export default function configureStore() {
  const middlewares = [
    thunk,
    reduxStorage,
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const reducer = storage.reducer(rootReducer);

  const store = createStore(
    reducer,
    compose(...enhancers)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  const load = storage.createLoader(engine);
  load(store);

  return store;
}
