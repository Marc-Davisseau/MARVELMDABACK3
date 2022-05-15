const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");

router.use(formidableMiddleware());

const apikey = process.env.API_KEY;

const isAuthenticated = require("../middlewares/isAuthenticated");


router.post("/characters", async  (req, res) => {
  console.log(req.fields)
  console.log(req.signIn)
let limit=100
let skip=""
let name=""
  if(req.fields.limit) {
   limit= req.fields.limit 
  }
  if(req.fields.skip) {
    skip= req.fields.skip 
   }
   if(req.query.name ) {
    name= req.query.name 
   }
   if(req.fields.name ) {
    name= req.fields.name 
   }

  const axios = require("axios");

 axios
   .get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}&limit=${limit}&skip=${skip}&name=${name}`)
   .then((response) => {
      console.log(response.data); // Affichera la réponse du serveur
      console.log(req.signIn)
      return res.json(response.data,)


   })
   .catch(error => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });
     
 } )

module.exports = router;