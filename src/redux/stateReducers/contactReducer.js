import initialState from "../initialState.json";
import * as taskActions from "../actionTypes";

function ContactReducer(state=initialState.contactSet,action){
    switch(action.type){
        case taskActions.ADD_CONTACT:
            return action.payload
        break;
        case taskActions.UPDATE_CONTACT:
            return {
                ...action.payload,
            }
        break;
        default :
            return state;
    }
}
export default ContactReducer;