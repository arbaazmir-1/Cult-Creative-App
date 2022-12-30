import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { jobListReducer, jobDetailsReducer } from "./reducers/jobReducers";

const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,

  // add reducers here
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
