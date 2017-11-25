import { Middleware, applyMiddleware, compose, createStore, combineReducers, ReducersMapObject, Reducer } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const reducers: ReducersMapObject = {};

function configureStore() {
  const middlewares: Middleware[] = [];

  if (__DEV__) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  middlewares.push(thunk);

  const rootReducer = () => ({});

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );
}

export function registerReducer(reducerName: string, reducer: Reducer<any>) {
  reducers[reducerName] = reducer;
  recreateReducers();
}

function recreateReducers() {
  const newReducer = combineReducers(reducers);
  store.replaceReducer(newReducer);
}

export const store = configureStore();
