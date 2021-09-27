import React,{useEffect} from 'react';
import {skinCodes ,fieldCd} from '../../constants/typeCodes';
import { withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import * as taskActions from "../../redux/actionTypes";
import {connect} from 'react-redux';
// import uuid from 'react-uuid';
import uuid from 'react-uuid';
function GettingStarted(props) {
     let history = useHistory();
    //  console.log(props.skinCd);
     const onChange = async (skin) => {
        if(props.document.id==""){
            let document={
                id : uuid(),
                skinCd:skin
            }
            props.set_skin(document);
    // console.log(skin);

        }
        else{
            props.update_skin(skin);
    // console.log(props.skinCd);
    // console.log(skin);

            
        }
        history.push('/contact');
      }
    

      
        return (  
            <>
            {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
            <div className="container med gettingStarted">
                <div className="section">
                    <h1 className=" center">
                    Select a resume template to get started</h1>
                    <p className=" center">
                    You’ll be able to edit and change this template later!
                    </p>
                    <div className="styleTemplate ">
                    {
                        skinCodes.map((val,index) => {
                            return( <div key={index} className="template-card rounded-border">
                                  <i className={(val == 'demo-value'? 'selected fa fa-check' :'hide') } ></i>
                                <img  className='' src={'/images/' + val + '.svg'}/>
                                <button type="button" onClick={()=>onChange(val)}  className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);
    
                        })
                    }
                    </div>
                
                </div>
            </div>
}
</>
        );
    
}
  
const mapStateToProps=(state)=>{
    return {
        authMine:state.auth,
        document:state.document,
        auth:state.firebase.auth
    };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        set_skin:(document)=>{
            // console.log(document);

            return dispatch({
                type:taskActions.SET_SKIN,
                payload:document,
            })
        },
        update_skin:(skinCd)=>{
            // console.log(skinCd);
            return dispatch({
                type:taskActions.UPDATE_SKIN,
                payload:skinCd,
            })
        },
       


    }
}
const higherOrderFunction=withRouter(connect(mapStateToProps,mapDispatchToProps)(GettingStarted));

export default higherOrderFunction;

