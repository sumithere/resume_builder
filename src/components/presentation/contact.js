
import {NavLink} from "react-router-dom";
// import update from 'immutability-helper';
import { fieldCd }  from '../../constants/typeCodes';
// import * as contactActions from '../../actions/contactActions';
// import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import ResumePreview from './resumePreview'
import { connect } from "react-redux";
import * as taskActions from "../../redux/actionTypes";

function Contact(props) {
   let history = useHistory();
//    console.log(props.document.id);
   let initialContacts={
       [fieldCd.FirstName]:"",
       [fieldCd.LastName]:"",
       [fieldCd.ProfSummary]:"",
       [fieldCd.Email]: "",
        [fieldCd.Phone]: "",
        [fieldCd.Profession]: "",
        [fieldCd.Street]: "",
        [fieldCd.City]: "",
        [fieldCd.State]: "",
        [fieldCd.Country]: "",
        [fieldCd.ZipCode]: ""
    }
   const [contact,setContact]= useState(initialContacts);
    // console.log(props.contact);
    useEffect(()=>{
        let key=Object.keys(props.contact);
        if(key.length!=0){

            setContact(props.contact);
        }
    },[]);
  const onchange=(event)=>{
     var key =event.target.name;
     var val=event.target.value;
     setContact({...contact,[key]:val});
    }
    const onSubmit= async()=>{
       let key=Object.keys(props.contact);
        if(key.length==0){
            props.addContact(contact);
        }
        else{
            props.updateContact(contact);
        }
        history.push('/education');
    }


    const getFieldData=(key)=>{
        return contact[key];
    }
    
    return (
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Personal Details</h2>
                    <div className="form-section">
                        <div className="input-group"><label>First Name</label>
                            <div className="effect"><input type="text" name={fieldCd.FirstName} value={getFieldData(fieldCd.FirstName)}  onChange={onchange}  /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Last Name</label>
                            <div className="effect"><input type="text" name={fieldCd.LastName}  value={getFieldData(fieldCd.LastName)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group full"><label>Professional Summary</label>
                            <div className="effect"><input type="text" name={fieldCd.ProfSummary}   value={getFieldData(fieldCd.ProfSummary)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Email</label>
                            <div className="effect"><input type="text"  name={fieldCd.Email}  value={getFieldData(fieldCd.Email)}  onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Phone</label>
                            <div className="effect"><input type="text"  name={fieldCd.Phone}   value={getFieldData(fieldCd.Phone)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>Profession</label>
                            <div className="effect"><input type="text"  name={fieldCd.Profession}  value={getFieldData(fieldCd.Profession)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Street</label>
                            <div className="effect"><input type="text" name={fieldCd.Street}   value={getFieldData(fieldCd.Street)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>City</label>
                            <div className="effect"><input type="text" name={fieldCd.City}  value={getFieldData(fieldCd.City)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-group"><label>State</label>
                            <div className="effect"><input type="text"   name={fieldCd.State}  value={getFieldData(fieldCd.State)}  onChange={onchange} /><span></span>
                            </div>
                            <div className="error"></div>
                        </div>


                        <div className="input-group"><label>Country</label>
                            <div className="effect"><input type="text"  name={fieldCd.Country}  value={getFieldData(fieldCd.Country)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="input-group"><label>Pin Code</label>
                            <div className="effect"><input type="text" name={fieldCd.ZipCode}  value={getFieldData(fieldCd.ZipCode)}  onChange={onchange}/><span></span>
                            </div>
                            <div className="error"></div>
                        </div>
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Next</button>
                            <NavLink to='/getting-started'  className="center">Back</NavLink>
                        </div>
                    </div>

                </div>

                <div className="preview-card">
                    <ResumePreview contactSection={contact} skinCd={props?.document?.skinCd}></ResumePreview>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps=(store)=>{
    return {
        document:store.document,
        contact:store.contact,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addContact:(contact)=>{
            return dispatch({
                type:taskActions.ADD_CONTACT,
                payload:contact
            })
        },
        updateContact:(contact)=>{
            return dispatch({
                type:taskActions.UPDATE_CONTACT,
                payload:contact
            })
        }
    }
}

const higherOrderFunction= withRouter(connect(mapStateToProps,mapDispatchToProps)(Contact));
export default higherOrderFunction;
