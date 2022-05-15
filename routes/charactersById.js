
const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

const apikey = process.env.API_KEY;


router.post("/character/:characterId", async  (req, res) => {

  console.log(req.fields.id)
  const axios = require("axios");



    // const location = useLocation();
    // const { id } = location.state;
// console.log(location)

axios
  .get(`https://lereacteur-marvel-api.herokuapp.com/character/${req.fields.id}?apiKey=${apikey}`)
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