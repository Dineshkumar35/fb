import React,{useState } from 'react';
import LabelComponent from "./LabelComponent";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

function LoginComponent(props) {
  const [userName,setuserName] = useState("");
  const [password,setpassword] = useState("");

  const handleNameChange =(data)=>{
     setuserName(data);
  }
  const handlePassChange =(data)=>{
     setpassword(data);
  }

  const handleClick=()=>{
    let userObject = {
        userName,
        password
    }
    if(userName && password){
      props.LoginClick(userObject);
    }else{
      alert("please enter login details")
    }
    
  }
  return (
    <div className="App">
         <div className="pad15"><LabelComponent className = "Heading" textName={"Login"}/></div>
         <div className="pad15">
            <LabelComponent className = "" textName={"User Name"}/><br/>
            <InputComponent className="form-control" type="text" placeholder="Enter user name" value={userName} handleChange={handleNameChange} />
         </div>
         <div className="pad15">
            <LabelComponent className = "" textName={"Password"}/><br/>
            <InputComponent className="form-control" type="password" placeholder="Enter password" value={password} handleChange={handlePassChange} />
         </div>
         <div>
           <ButtonComponent handleClick={handleClick} BtnText="Login" className="btn btn-primary"/>
         </div>
         <div className="pad15">
              If you don't have Account please <a href="/">Register</a>
         </div>
    </div>
  );
}

export default LoginComponent;
