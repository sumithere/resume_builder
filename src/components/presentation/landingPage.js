import React,{useEffect} from 'react';
import logo from "../../static/images/resume.png";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as taskActions from "../../redux/actionTypes";
import { getFirebase } from 'react-redux-firebase';

const Lp = (props) => {
  useEffect(()=>{
    const firebase=getFirebase();
    const unsuscribe=firebase.auth().onAuthStateChanged(function(user){
            props.setLoading(true);
            props.setUser(user);
            props.setLoading(false);
    })
    return function(){
        return unsuscribe;
    }
  },[]);
    return (    
    
        <div className="container  lp-page center">          
        <div className="section">
         <h1>Create a resume that stands out</h1>
           <p >Create a Resume that perfectally describes your skils and match job profile.</p>
            <br></br>
           <div >
                <NavLink to="/getting-started"  className="btn hvr-float-shadow"><span>Get Started for Free</span>
                </NavLink>
                
                </div>
                <img src={logo}   className="lp-resume" alt="logo" />
         </div>        
         </div>
    
        );
}
const mapStateToProps=(state)=>{
  return state.firebase.auth;
}
const mapDispatchToProps=(dispatch)=>{
  return{
    setLoading:(value)=>{
      dispatch({
        type:taskActions.SIGN_UP,
        payload:value
      })
    },
    setUser:(user)=>{
      return dispatch({
          type:taskActions.SET_USER,
          payload:user,
      })
  }

  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Lp);