import React, { useState, useEffect, useReducer } from 'react';
import LoginComponent from "../Component/LoginComponent";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector,useStore } from 'react-redux';
function Login() {
  const store = useStore();
  const LoginClick = (userdata) => {
    axios.post("/signin",userdata)
    .then(function (response) {
      console.log(response.data.userDetails)
       if(response.data && response.data.success){
          window.open("/Confirm","_self");
           localStorage.setItem("UserData",response.data && response.data.userDetails ? response.data.userDetails.Email:"")
       }else{
           alert("Please enter valid details")
       }
          //response.data.json().then(function (responseText) {
          //  store.dispatch({type: 'LOGIN_DATA', LoginData: response.data});
         // });
      })
    .catch(err=>{
      console.log(err);
    });
  }
  const LoginStatus = useSelector(state => state && state.LoginData);
  const logout =()=>{
    
    let userId = LoginStatus && LoginStatus.userDetails && LoginStatus.userDetails._id ? LoginStatus.userDetails._id:"";
    axios.post("/logout",{id:userId})
    .then(function (response) {
      store.dispatch({type: 'LOGIN_DATA', LoginData: ""});
      window.open("/Login","_self");
      })
    .catch(err=>{
      console.log(err);
    });
  }
  
  return (
    <div className="container">
      <Row>
        <Col lg={3} md={3} sm={3} xs={3} />
        <Col lg={6} md={6} sm={6} xs={6}>
          {LoginStatus && LoginStatus.auth ? <div className="App"><div className="pad15">Login Sucessfully <a onClick={logout}>Log out</a></div>
           <div className="pad15">Name : {LoginStatus && LoginStatus.userDetails && LoginStatus.userDetails.fullName ? LoginStatus.userDetails.fullName:""}</div>
           <div className="pad15">Email : {LoginStatus && LoginStatus.userDetails && LoginStatus.userDetails.Email ? LoginStatus.userDetails.Email:""}</div>
          </div>:<LoginComponent LoginClick={LoginClick} />}
        </Col>
      </Row>
    </div>
  );
}

export default Login;
