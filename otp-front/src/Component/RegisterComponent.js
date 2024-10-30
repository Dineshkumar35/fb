import React,{useState } from 'react';
import LabelComponent from "./LabelComponent";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { useSelector,useStore } from 'react-redux';

function RegisterComponent(props) {
  const [fullName,setfullName] = useState("");
  const [Email,setEmail] = useState("");
  const [userName,setuserName] = useState("");
  const [password,setpassword] = useState("");
  const [Cpassword,setCpassword] = useState("");

  const handleNameChange =(data)=>{
     setuserName(data);
  }
  const handlePassChange =(data)=>{
     setpassword(data);
  }
  const handleFNameChange =(data)=>{
    setfullName(data);
 }
 const handleEmailChange =(data)=>{
    setEmail(data);
 }
 const handleCPassChange =(data)=>{
    setCpassword(data);
 }
  
  
  
  const handleClick=()=>{
    let userObject = {
        fullName,
        Email,
        userName,
        password,
        Cpassword
    }
    if(fullName && Email && userName && password && Cpassword){
      props.ReigsterClick(userObject);
     }else{
       alert("Please enter all the Details")
     }  
  }
  const failure = useSelector(state => state && state.RegisterData && state.RegisterData.failure);
  let emailStatus = failure && failure.emailFailure ? "invalidBr":"";
  let userNameStatus = failure && failure.userNameFailure ? "invalidBr":"";
  let passStatus = failure && failure.passwordFailure ? "invalidBr":"";
  return (
    <div className="App">
         <div className="pad15"><LabelComponent className = "Heading" textName={"Registration"}/></div>
         <div className="pad15">
            <LabelComponent className = "" textName={"Full Name"}/><br/>
            <InputComponent className="form-control" type="text" placeholder="Enter full name" value={fullName} handleChange={handleFNameChange} />
         </div>
         <div className="pad15 form-group">
            <LabelComponent className = "" textName={"Email"}/><br/>
            <InputComponent className={"form-control "+emailStatus} type="text" placeholder="Enter email" value={Email} handleChange={handleEmailChange} />
            {failure && failure.emailFailure ?(<LabelComponent className ="invalid" textName={failure && failure.emailFailure}/>):""}
         </div>
         <div className="pad15 form-group">
            <LabelComponent className = "" textName={"User Name"}/><br/>
            <InputComponent className={"form-control "+userNameStatus} type="text" placeholder="Enter user name" value={userName} handleChange={handleNameChange} />
            {failure && failure.userNameFailure ?(<LabelComponent className ="invalid" textName={failure && failure.userNameFailure}/>):""}
         </div>
         <div className="pad15">
            <LabelComponent className = "" textName={"Password"}/><br/>
            <InputComponent className="form-control" type="password" placeholder="Enter password" value={password} handleChange={handlePassChange} />
         </div>
         <div className="pad15">
            <LabelComponent className = "" textName={"Confirm Password"}/><br/>
            <InputComponent className={"form-control "+passStatus} type="password" placeholder="Enter confirm password" value={Cpassword} handleChange={handleCPassChange} />
            {failure && failure.passwordFailure ?(<LabelComponent className ="invalid" textName={failure && failure.passwordFailure}/>):""}
         </div>
         <div>
           <ButtonComponent handleClick={handleClick} BtnText="Register" className="btn btn-primary"/>
         </div>
         <div className="pad15">
              If you have Account please <a href="/Login">Login</a>
         </div>
    </div>
  );
}

export default RegisterComponent;
