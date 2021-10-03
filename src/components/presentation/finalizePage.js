import React,{useEffect} from "react";
import ResumePreview from './resumePreview'
import  jsPDF  from "jspdf";
// import { useEffect } from "react";
import html2canvas from 'html2canvas';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'

   function Finalize(props) {
    const firestore = useFirestore();
    let educationSection= props.educationSection
    let contactSection=props.contactSection
    let documentd=props.document
    
    
    const saveToDatabase = async () => {
      // user collection 
      // console.log(props.auth.uid);
      let userRef = await firestore.collection('users').doc(props.auth.uid);
      // data get 
      let docExists=false;
      let copyOfdoc={};
      userRef.get().then(async(doc)=>{
        if(doc.exists){
          docExists=true;
          copyOfdoc=doc.data();
          console.log(copyOfdoc);
        }
      
      let newObj = [];
      // console.log(userRef);
      // console.log(userRef.data());
      // let user = userRef.data();
      // console.log(userRef,user);
      if(docExists){
        let expand=copyOfdoc.resumeIds;
        console.log(expand);
        newObj = [
          ...expand,
          {[documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd }}
        ]
        console.log("docExists",newObj);
        await firestore.collection('users').doc(props.auth.uid).update({
          resumeIds: newObj
        })
      }
      else{
        newObj = [
          {[documentd.id]:
            { educationSection: educationSection, contactSection: contactSection, document: documentd }}
        ]
        console.log("docNotExists",newObj);
        await firestore.collection('users').doc(props.auth.uid).set({
          resumeIds: newObj
        })
      }
    })
      // if (user.resumeIds != undefined) {
      //   // /map => object 
      // if(userRef.exists){

      //   newObj = {
      //     ...user.resumeIds,
      //     [documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd }
      //   }
      //   await firestore.collection('users').doc(props.auth.uid).update({
      //     resumeIds: newObj
      //   })
      // }

      // }
      // else {
      //   newObj = {
      //     [documentd.id]:
      //       { educationSection: educationSection, contactSection: contactSection, document: documentd }
      //   }
      //   await firestore.collection('users').doc(props.auth.uid).set({
      //     "resumeIds":newObj
      //   })

      // }
      // console.log(user.resumeIds);
    
      // console.log(documentd);
      // console.log(newObj);
      
    }
     const downloadResume=()=> {
    
      const input = document.getElementById("resumePreview");
      console.log(document)
       html2canvas(input)
         .then((canvas) => {
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF("p", "mm", "a4");
           var width = pdf.internal.pageSize.getWidth();
           var height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
           // pdf.output('dataurlnewwindow');
           pdf.save("resume.pdf");
         }).catch(function(error){
           console.log(error)
         })
     }
    return (
      <div className="container full finalize-page" >
      <div className="funnel-section ">
          <div className="finalize-preview-card " id="resumePreview">
            <ResumePreview contactSection={props.contactSection} educationSection={props.educationSection} skinCd={props?.document?.skinCd}></ResumePreview>   
          </div>
          <div className="finalize-settings center">            

             
              <div className=" download-resume resume-options">
                <p className="no-margin"  >
                  Download Resume As PdF
                </p>
                    <a style={{cursor:'pointer'}}  onClick={downloadResume}  >download Resume</a>
             </div>
             <div className=" download-resume resume-options">
                <p className="no-margin"  >
                 Save to Database
                </p>
                    <a style={{cursor:'pointer'}}  onClick={saveToDatabase}  >Save to Database</a>
             </div>
    </div>
    </div>
    </div>
    )

    
}

const mapStateToProps=(store)=>{
  return{
    document:store.document,
    contactSection:store.contact,
    educationSection:store.education,
    auth: store.firebase.auth,
  }
}


export default withRouter(connect(mapStateToProps)(Finalize));
