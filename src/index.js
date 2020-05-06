import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import "./index.css";
import * as Sentry from "@sentry/browser";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {Provider} from 'react-redux'
import rootReducer from '../src/components/store/index'
import {createFirestoreInstance,getFirestore} from 'redux-firestore'
import {  ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore


const store = createStore(rootReducer,applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})));
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`
});

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
  </Provider>
  , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
