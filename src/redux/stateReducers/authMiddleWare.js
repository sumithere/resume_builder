import * as actionTypes from "../actionTypes";
import { getFirebase } from "react-redux-firebase";
export const signInSuccess = (users) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,

    }
}
export const signup=(email,password)=>{
    return async(dispatch)=>{
        const firebase=getFirebase();
        let res=await firebase.auth().createUserWithEmailAndPassword(email, password);
        dispatch({
            type:actionTypes.SET_USER,
            payload:res.user
        })
    }
}
export const signOut=()=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.SIGN_OUT,
            payload:true
        })
        const firebase=getFirebase();
        let data=await firebase.auth().signOut();
        dispatch({
            type:actionTypes.SIGN_OUT,
            payload:false
        })
    }
    
}
export const signInFailed = (error) => {
    return {
        type: actionTypes.SIGN_IN_FAILED,
        payload: error
    }
}
export const signIn=(userData)=>{
    return async (dispatch, getState, { displayName, getFirestore })=>{
        dispatch({
            type:actionTypes.SIGN_IN_REQUEST
        })
        const firebase=getFirebase();
        try{
            console.log(userData);
            let data = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
            dispatch({
                type:actionTypes.SIGN_IN_SUCCESS
            })
        }
        catch(err){
            console.log("Error is ", err)
            dispatch({
                type:actionTypes.SIGN_IN_FAILED,
                payload:err
            })
            setTimeout(() => {
                // error false
                dispatch({ type: actionTypes.REMOVE_ERROR })
            }, 2000)
        }
    }
}