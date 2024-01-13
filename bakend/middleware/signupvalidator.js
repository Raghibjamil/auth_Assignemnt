const emailValidator=require('email-validator');

const signupValidator=(req,res,next)=>{
  const {name,username,email,password,bio}=req.body;
  console.log(name,username,email,password,bio);
  const validEmail=emailValidator.validate(email);
  if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address "
      });
  }
  if(name && username && email && password && bio){
    next();
  }else{
    res.status(404).send({msg:"all Input Fields are required"})
  }
}

module.exports={signupValidator};