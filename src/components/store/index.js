
import { combineReducers } from "redux";
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import {componentStateReducer} from './reducers/componentStateReducer'
import {bookmarkReducer} from  './reducers/bookmarkReducer'
import {formReducer} from './reducers/formReducer'
export const initialState ={
    
}
const rootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase : firebaseReducer,
    componentState: componentStateReducer,
    bookmarkShopState: bookmarkReducer,
    formReducer:formReducer,
});

export default rootReducer