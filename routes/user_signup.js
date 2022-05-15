require('dotenv').config();

const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());
//import des packages
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//  cloud_name :   process.env.CLOUD_NAME,
//  api_key :   process.env.API_KEY,
//  api_secret : process.env.API_SECRET,
//  } );

//import models
const SignIn = require("../Models/SignIn")


router.post("/user/signup", async (req,res) =>{

    try {
   
        console.log(req.fields)
        // Destructuring des req.fields
        const{
            username,
            email,
            password,
            newsletter,
            picture,
        } = req.fields
  
    if (username && email &&  password) {
        const isUserExisting = await SignIn.findOne({
            email: email,    
        })
        if (!isUserExisting){
           
            //Genérer le salt
            const salt = uid2(32);
            //Générer le hash
            const hash = SHA256(password + salt).toString(encBase64);
            //Générer le token
            const token = uid2(16);
     
            const newSignUp = new SignIn({
                    email:email,         
                    account: { 
                    username:username, 
                    },   
                    newsletter:newsletter,
                    token: token,
                    hash: hash,
                    salt: salt,   } 
                        
            )
      if(req.files.picture){
      const result = await cloudinary.uploader.upload(req.files.picture.path, {
        folder: "marvel/avatars",
        public_id: `${username} - ${newSignUp._id}`,
      });

  newSignUp.account.avatar = result
    } else{
    }
  //newSignUp.account["avatar"] = result 
    await newSignUp.save()
    console.log(newSignUp.id)
    res.status(200).json( 
        newSignUp
        )
        }
  else {
            res.status(400).json({message :"User already knows"})
        }
    }

else {

    res.status(400).json({message :"Le formulaire n'est pas correctement rempli"})


}
    
    } catch (error) { res.status(400).json({message: "Erreur400"})
    }
    })
    
module.exports = router;