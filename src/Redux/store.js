import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import {reducer} from "./reducer"
import {authReducer} from "./auth/reducer"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  reducer : reducer,
  authReducer : authReducer
}) 

const customThunks = (store) => (next) => (action) => {
  return typeof action === "function" ? action(store.dispatch) : next(action);
};

const composedEnhancer = compose(
  applyMiddleware(customThunks),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, composedEnhancer);
export { store };
