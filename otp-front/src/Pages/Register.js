import React, { useState, useReducer } from 'react';
import RegisterComponent from "../Component/RegisterComponent";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector,useStore } from 'react-redux';
function Register() {
  const store = useStore();
  const ReigsterClick =(data)=>{
    axios.post("/register",data)
      .then(function (response) {
        console.log(response)
            //response.json().then(function (responseText) {
              store.dispatch({type: 'REGISTER_DATA', RegisterData: response.data});
            //});
        })
      .catch(err=>{
        console.log(err);
      });
     }
     const RegistrationStatus = useSelector(state => state && state.RegisterData);
  return (
    <div className="container">
      <Row>
        <Col lg={3} md={3} sm={3} xs={3} />
        <Col lg={6} md={6} sm={6} xs={6}>
          {RegistrationStatus && RegistrationStatus.success ? (<div>Register Successfully. please <a href="/Login">Login</a></div>):<RegisterComponent ReigsterClick={ReigsterClick}/>}
          
        </Col>
      </Row>
    </div>
  );
}

export default Register;
