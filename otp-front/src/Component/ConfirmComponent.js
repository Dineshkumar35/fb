import React,{useState } from 'react';
import LabelComponent from "./LabelComponent";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";

function LoginComponent(props) {
  const [otp,setOtp] = useState("");
  const [BtnStatus,setBtnStatus] = useState("btn-secondary disabled");

  const handleOtpChange =(data)=>{
    setOtp(data);
    if(data){
      setBtnStatus("btn-primary")
    }else{
      setBtnStatus("btn-secondary disabled")
    }
  }

  const handleClick=()=>{
    let userObject = {
      otp
    }
    if(otp){
      props.CheckValidClick(userObject);
    }else{
      alert("please enter valid otp")
    }
  }
  const ResendEmail=()=>{
    let data = {Email:props.email};
    axios.post("/resendOtp",data)
    .then(function (response) {
      console.log(response.data)
           // store.dispatch({type: 'LOGIN_DATA', LoginData: response.data});
      })
    .catch(err=>{
      console.log(err);
    });
  }
  let Status = props.LoginStatus && props.LoginStatus.failure ? "invalidBr":"";
  return (
    <div className="App">
         <div className="pad15"><LabelComponent className = "Heading1" textName={"Enter the code from your email"}/></div>
         <div className="pad15">
            <LabelComponent className = "" textName={"Let us know that this email address belongs to you. Enter the code from the email sent to"}/><br/>
         </div>
         <div className="pad15">
         <InputComponent className={"form-control "+Status} type="text" placeholder="Enter otp" value={otp} handleChange={handleOtpChange} />
         {Status ?(<LabelComponent className ="invalid" textName={"Please enter correct otp"}/>):""}
         </div>
         <div className="pad15">
         <a onClick={ResendEmail}>Resend otp</a>
           </div>
         <div>
           <ButtonComponent handleClick={handleClick} BtnText="Continue" className={"btn "+BtnStatus}/>
         </div>
    </div>
  );
}

export default LoginComponent;
