import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// const select= (state) => {
//   return state.authReducer.user.accessToken
// }

// const listener = () => {
//   let token = select(store.getState())
//   axios.defaults.headers.common['Authorization'] = token;
// }
// store.subscribe(listener)

export default store;
