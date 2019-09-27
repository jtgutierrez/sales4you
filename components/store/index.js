import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import companies from "./companies";
import distance from "./distance";

const reducer = combineReducers({ companies, distance });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./companies";
