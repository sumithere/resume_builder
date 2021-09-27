import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import logo from "../../static/images/logo.png";
import {connect} from "react-redux";
import * as authActions from "../../redux/stateReducers/authMiddleWare";
import {getFirebase} from "react-redux-firebase";

// let auth = firebase.auth();


function LoggesOut(props) {
  return (
    <ul>
      <li className="signup ">
        <NavLink className=" btnv-1" to="/register">
        Register
        </NavLink>
      </li>
      <li className="signin"> 
        <NavLink className="text-blue btnv-3" to="/login">
        Sign In
        </NavLink>         
      </li>
    </ul>
  )
}

const Header = (props) => {
  // const auth = props.auth;
  // const [loading,setLoading]=useState(false);
  const handleLogOut=async()=>{
    props.signout();
   console.log('The user will sign out');
  }

  return (  
    <>
    
  <header className="header">
  <nav className="nav">
      <a href="/" className="holder-logo">
        <img className='logo' src={logo}></img>
      </a> 
        <div className="header-links full-height">

        {/* { isLoaded(auth) && !isEmpty(auth) ?<> */}
        <LoggesOut></LoggesOut>
          
          <ul>
            {props.auth.uid?<li className="signin text-blue btnv-3">
              User Logged In
            </li>:<><li className="signin text-blue btnv-3"> Please Login</li></>}
            
            <li className="signin"> 
              <button className="text-blue btnv-3" onClick={handleLogOut}>
             Signout
              </button>         
            </li>
          </ul>

        {/* </>:<LoggesOut></LoggesOut>} */}
          
          <ul id="nav-mid">
            <li>
            <NavLink className="btn-nvt-gm" to="/resume-templates">
            Resume Templates
            </NavLink>
            </li> 
            <li className="holder-pricing">            
              <NavLink className="btn-nvt-gm" to="/about-us">
              About Us
              </NavLink>
            </li>        
          </ul>
            
      </div>   
    </nav>
  </header>

</>
  );
};

const mapStateToProps=(state)=>{
  return{
     auth: state.firebase.auth,
     authMine:state.auth
  }
}
const mapDispatchToProps= (dispatch)=>{
  return {
   signout:()=>{ dispatch(authActions.signOut())
  }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
