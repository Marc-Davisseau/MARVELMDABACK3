const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

const apikey = process.env.API_KEY;


router.post("/comics", async  (req, res) => {
  console.log(req.fields)
let limit=100
let skip=""
let title=""
  if(req.fields.limit) {
   limit= req.fields.limit 
  }
  if(req.fields.skip) {
    skip= req.fields.skip 
   }
   if(req.fields.title) {
    title= req.fields.title 
   }

  const axios = require("axios");

 axios
   .get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&limit=${limit}&skip=${skip}&title=${title}`)
   .then((response) => {
     console.log(response.data); // Affichera la réponse du serveur
     return res.json(response.data)


   })
   .catch(error => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });
     
 } )

module.exports = router;