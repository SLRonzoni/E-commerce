import { createStore, combineReducers } from "redux";
import { productosReducer } from "./reducer";

const reducers =combineReducers({
    productosReducer
});

const store =createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;