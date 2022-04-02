import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducer/combineReducer.js";

const store = createStore(reducers, composeWithDevTools());

export default store;
