import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";

function EducationReducer(state=initialState.educationSet,action){
    switch(action.type){
        case actionTypes.ADD_EDUCATION:
            return action.payload;
        break;    
        case actionTypes.UPDATE_EDUCATION:
            return {
                ...action.payload
            }
        break;
        default:
            return state;
    }
}
export default EducationReducer;