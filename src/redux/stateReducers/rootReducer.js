import {combineReducers} from "redux";
import ContactReducer from './contactReducer';
import DocumentReducer from "./documentReducer";
import EducationReducer from "./educationReducer";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";


const rootReducer=combineReducers({
    document:DocumentReducer,
    contact:ContactReducer,
    education:EducationReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer
});
export default rootReducer;