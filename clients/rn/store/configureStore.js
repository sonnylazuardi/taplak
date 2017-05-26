import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const middlewares = [
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
