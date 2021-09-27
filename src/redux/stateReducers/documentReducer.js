import initialState from "../initialState";
import * as taskActions from "../actionTypes";

function DocumentReducer(state=initialState.document,action){
    // console.log(action.payload);

    switch(action.type){
        case taskActions.SET_SKIN:
            return(action.payload)
        break;
        case taskActions.UPDATE_SKIN:
            return{
                ...state,
                skinCd:action.payload
            }
        break;
        default:
            return state;
    }
}
export default DocumentReducer;