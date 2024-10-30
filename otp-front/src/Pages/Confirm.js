import React, { useState, useEffect, useReducer } from 'react';
import ConfirmComponent from "../Component/ConfirmComponent";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector,useStore } from 'react-redux';
function Login() {
  const [email,setEmail] = useState("");
  useEffect(() => {
    let getData = localStorage.getItem("UserData");
    console.log(getData);
    setEmail(getData)
}, [])
  const store = useStore();
  const CheckValidClick = (data) => {
    axios.post("/validateOtp",data)
    .then(function (response) {
      console.log(response.data)
            store.dispatch({type: 'LOGIN_DATA', LoginData: response.data});
      })
    .catch(err=>{
      console.log(err);
    });
  }
  const logout =()=>{
    let userId = LoginStatus && LoginStatus.userDetail && LoginStatus.userDetail._id ? LoginStatus.userDetail._id:"";
    axios.post("/logout",{id:userId})
    .then(function (response) {
      store.dispatch({type: 'LOGIN_DATA', LoginData: ""});
      window.open("/Login","_self");
      localStorage.clear();
      })
    .catch(err=>{
      console.log(err);
    });
  }
  const LoginStatus = useSelector(state => state && state.LoginData);
  
  
  return (
    <div className="container">
      <Row>
        <Col lg={3} md={3} sm={3} xs={3} />
        <Col lg={6} md={6} sm={6} xs={6}>
        {LoginStatus && LoginStatus.success ? <div className="App"><div className="pad15">Login Sucessfully <a onClick={logout}>Log out</a></div>
           <div className="pad15">Name : {LoginStatus && LoginStatus.userDetail && LoginStatus.userDetail.fullName ? LoginStatus.userDetail.fullName:""}</div>
           <div className="pad15">Email : {LoginStatus && LoginStatus.userDetail && LoginStatus.userDetail.Email ? LoginStatus.userDetail.Email:""}</div>
          </div>:<ConfirmComponent CheckValidClick={CheckValidClick} LoginStatus={LoginStatus} email={email}/>}
          
        </Col>
      </Row>
    </div>
  );
}

export default Login;
