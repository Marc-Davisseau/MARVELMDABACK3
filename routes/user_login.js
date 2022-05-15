const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());
//import des packages
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");



const SignIn = require("../models/SignIn");



router.post("/user/login", async (req,res)=>{
    try {
const{
    email,
    password
} =req.fields

console.log(req.fields)
        if  (email && password){
    const isEmailExist = await SignIn.findOne({
    email: email
    })
 

 
                   if(isEmailExist){
    
    const newHash = SHA256(password+isEmailExist.salt).toString(encBase64)

    ////Je compre les hashs
                          if (isEmailExist.hash === newHash) {
    res.status(200).json( 
        isEmailExist, 
 
 

    
)
        }
                        else{
                            
                            res.status(401).json({message: "Login failled"})
                        }
                    }
                    else {     
                        res.status(400).json({message : "Login failled"})
                    }
    }
    else {  
            res.status(400).json({message : "Email and Password are required"})
        }  
    } catch (error) { 
        res.status(400).json({message:"Erreur400"})
    }
    })
    
module.exports = router;


