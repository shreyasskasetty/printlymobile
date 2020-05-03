
import { combineReducers } from "redux";
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import {componentStateReducer} from './reducers/componentStateReducer'
import {bookmarkReducer} from  './reducers/bookmarkReducer'
export const initialState ={
    
}
const rootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase : firebaseReducer,
    componentState: componentStateReducer,
    bookmarkShopState: bookmarkReducer
});

export default rootReducer