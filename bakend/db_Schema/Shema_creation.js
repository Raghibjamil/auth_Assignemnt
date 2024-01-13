const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const JWT = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String
  }
},{ timestamps: true });


// custom method for generating the jwt token....
// method to generate token 
userSchema.methods={
  jwtToken(){
      return JWT.sign({id:this._id,username:this.username},process.env.SECRET,{
          expiresIn:'24h' // expire in 24 hour
      })
  }
}




// encrypting password before saving ....
// Hash password before saving to the database
// mongoose provide a custom method for encryption of the password...
//userSchema.pre('save', ...) sets up a Mongoose middleware that runs before the save operation on a document.
userSchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();

  // Hash the password using bcrypt
  //  hashes the password using bcrypt with a cost factor of 10. The result is then assigned back to the password field of the document
  try{
  this.password = await bcrypt.hash(this.password, 10);

  // Continue with the save operation
  return next();
  }catch(e){
    return next(e);
  }
});





const User = mongoose.model('User', userSchema);

module.exports = User;
