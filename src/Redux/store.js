import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import {reducer} from "./reducer"
import thunk from "redux-thunk"

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducer, composedEnhancer);
export { store };
