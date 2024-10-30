const express = require("express");
const router = express.Router();
const RegisterModel = require("../model/RegisterModel");
const jwt = require('jsonwebtoken');
const config = require("../config");   
const Constant = require("../Constant");  
const mailSender = require("../mailConfig")
router.post('/register', async(req, res) => {
    try{
        const {fullName,Email,userName,password,Cpassword} = req.body;
        //let hashedPassword = bcrypt.hashSync(password, 8);
        let rand = Math.floor((Math.random() * 10000) + 54);
       
         
        
        let List = {};
        List.fullName = fullName;
        List.Email = Email;
        List.userName = userName;
        List.password = password;
        List.Cpassword = Cpassword;
        List.otp = rand;

        let failure = "";
       if(Email){
         let emailFailure = Constant.emailRegexp.test(Email) 
         if(!emailFailure){
            failure = {emailFailure:Constant.emailFailure}
         }
       }
       if(password && Cpassword){
            let passWordFailure = password === Cpassword;
            console.log(passWordFailure)
            if(!passWordFailure){
                failure = {...failure,passwordFailure:Constant.passwordFailure}
            }
       }
        let UserDetails = await RegisterModel.findOne({userName});
        console.log(UserDetails)
        if(UserDetails && userName){
            failure = {...failure,userNameFailure:Constant.userNameFailure}
        }
        
        if(!failure){
            let userModel = new RegisterModel(List) 
            let users = await userModel.save();
            mailSender(Email,rand);
            if(users){
                res.status(200).json({
                    success:"Register Successfully"
                }) 
            }
        }else{
            res.status(200).json({
                failure
            });
        }
                
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
   
});
router.post('/signin', (req, res)=> {
    const {userName,password} = req.body;
    let List = {};
    List.userName = userName;
    List.password = password;
    //let UserModel = RegisterModel();
    RegisterModel.findOne({userName})
    .then(function(data){
        let token = jwt.sign({ id: data._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
        res.status(200).json({
            success:"Login Successfully",
            auth: true, token: token,userDetails:data
        })     
     })
     .catch(function(error){
        res.status(500).json({
            failure:"Not Added"
        });
     })
});
router.post('/validateOtp', async(req, res)=> {
    const {otp} = req.body;
    //let UserModel = RegisterModel();
   let userDetail = await RegisterModel.findOne({otp});
   console.log(userDetail)
   if(userDetail){
    res.status(200).json({
        success:"Login Successfully",
        userDetail
    }) 
   }else{
    res.status(200).json({
        failure:"Not Added"
    });
   }
});
router.post('/resendOtp', async(req, res)=> {
    const {Email} = req.body;
    //let UserModel = RegisterModel();
   let userDetails = await RegisterModel.findOne({Email});
   console.log(userDetails)
   if(userDetails){
    mailSender(userDetails.Email,userDetails.otp);
    res.status(200).json({
        success:"Login Successfully",
        userDetails
    }) 
   }else{
    res.status(200).json({
        failure:"Not Added"
    });
   }
});


router.post('/logout', (req, res)=> {
    const {id} = req.body;
     jwt.sign({ id }, config.secret, function(err, token) {
        if(token){
            res.status(200).json({
                success:"Logout Successfully"
            })  
        }
      });
});
module.exports = router;
