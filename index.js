
const express = require("express");
const formidable = require("express-formidable");
require('dotenv').config();
const mongoose = require("mongoose");

//Création du serveur

const cors = require("cors");
const app = express();
app.use(cors());

//Connexion à la bdd
mongoose.connect("mongodb://localhost/Marvel");

//import du middleware
const isAuthenticated = require("./middlewares/isAuthenticated")

//import des routes
 const Characters = require("./routes/characters");
const CharactersById = require("./routes/charactersById");
const Comics = require("./routes/comics");
const ComicsById = require("./routes/comicsById");
const User_Login = require("./routes/user_login");
const User_SignUp = require("./routes/user_signup");

const apikey = process.env.API_KEY;




// app.use(Characters);
app.use(Characters);
app.use(CharactersById);
app.use(Comics);
app.use(ComicsById);
app.use(User_Login)
app.use(User_SignUp)

app.all("*", async  (req, res) => {
    res.status(404).json("Page introuvable !");
  });
  // process.env.PORT
app.listen(process.env.PORT, () => { 
  console.log("Server has starteed !");
});

//1 : npm init -y
//2 : npm install express express-formidable mongoose axios
//3 : npm install crypto-js uid2 
//4 : npx nodemon server.js 

