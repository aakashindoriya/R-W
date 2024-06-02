import {thunk} from 'redux-thunk';

import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
    compose
} from 'redux';
import setAuthToken from '../utils/auth';
import authReducer from './reducers/auth.reducer';

// Initialize token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const root=combineReducers({
   auth:authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    root,
    composeEnhancers(applyMiddleware(thunk))
);
