import {createStore , applyMiddleware } from 'redux';
import rootReducer from './stateReducers/rootReducer';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
// import { FirebaseApp } from '@firebase/app';
import firebase from 'firebase/app';

import { composeWithDevTools } from 'redux-devtools-extension';
// import firebaseConfig from "../secrets";
// firebase.firestore();


let store=createStore(rootReducer,
    composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)));
export default store;