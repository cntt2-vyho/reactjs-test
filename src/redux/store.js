import {createStore} from 'redux';
import rootReducer from './reducer';
// import thunk from "redux-thunk";
// , applyMiddleware(thunk)
const store = createStore(rootReducer);

store.subscribe(function () {
    console.log(store.getState());
})

export default store;