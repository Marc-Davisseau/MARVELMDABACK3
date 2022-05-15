const mongoose = require("mongoose");

const SignIn = mongoose.model("SignIn",{
    
    email: {
      unique: true,
      type: String,
    },
    account: {
      username: {
        required: true,
        type: String,
      },
      // avatar: {    required: false, type: mongoose.Schema.Types.Mixed, default: {} },
    },
    newsletter: Boolean,
    token: String,
    hash: String,
    salt: String,
  //  avatar: {    required: false, type: mongoose.Schema.Types.Mixed, default: {} }, 
    // avatar: Object, // nous verrons plus tard comment uploader une image
   },    
)  
     // avatar: Object, // nous verrons plus tard comment uploader une image    

  
module.exports = SignIn