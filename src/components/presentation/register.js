import React,{useState,useEffect} from "react";
import { actionTypes, isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import * as taskActions from "../../redux/actionTypes";
import * as middleWare from "../../redux/stateReducers/authMiddleWare";
import { useHistory } from "react-router";
  function Register(props) {
 
    let history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const handleEmail= (e)=>{
      setEmail(e.target.value);
      }
      const handlePassword=(e)=>{
        setPassword(e.target.value);
      }
   
  const onSubmit=()=>{
      props.setLoading(true);
      props.register(email, password);
      props.setLoading(false);
  }
  useEffect(()=>{
    if(props.auth?.uid){
      history.push("/");
    }
  },[props]);

 
    return (
      <>
     {!isLoaded(props.auth)?<></>:<>
        {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are resgistering you in</h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
               
                    <h2 className="form-heading center">Enter your details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email||''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password||''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                        </div>
                       
                    </div>
                </div>

            </div>
        </div>
  }
  </>
     }
        </>
    );
  }


  const mapStateToProps=(state)=>{
    return{
      authMine:state.auth,
      auth:state.firebase.auth,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
      return{
        register:(email,password)=>{
          dispatch(
            middleWare.signup(email,password))
        },
        setLoading:(value)=>{
          dispatch({
            type:taskActions.SIGN_UP,
            payload:value
          })
        }
      }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Register);