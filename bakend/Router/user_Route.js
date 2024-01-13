const express=require('express');
const userRoute=express.Router();
const { signupValidator } = require("../middleware/signupvalidator");
const {userSignUp}=require("../controller/user");
const {loginValidator}=require("../middleware/loginValidator");
const {userlogin}=require("../controller/user")

userRoute.post("/signup",signupValidator,userSignUp);
userRoute.post("/login",loginValidator,userlogin);




module.exports={userRoute};
// module.exports=userRoute;