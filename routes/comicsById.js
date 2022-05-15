const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

const apikey = process.env.API_KEY;


router.post("/comics/:characterId", async  (req, res) => {

  console.log(req.fields.Id)
  const axios = require("axios");

axios
  .get(`https://lereacteur-marvel-api.herokuapp.com/comics/${req.fields.Id}?apiKey=${apikey}`)
  .then((response) => {
    console.log(response.data); // Affichera la réponse du serveur
    return res.json(response.data)


  })
  .catch(error => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });
   }  
   )

module.exports = router;