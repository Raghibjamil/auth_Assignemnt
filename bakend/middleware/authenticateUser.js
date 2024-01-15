const JWT = require("jsonwebtoken")
const authenticateUser=(req,res,next)=>{
//  const token = req.cookies?.token || null;
const token = (req.cookies && req.cookies.token) || null;
 console.log(`token extract from cookie :-${token}`);
 if(!token){
    return res.status(404).send({msg:"user authentication failed",
    token:req.cookies
})
 }
 try{
    const payload = JWT.verify(token,process.env.SECRET);
    // If verification is successful, store the user information in req.user

    // In the context of authentication, when a user is successfully authenticated, their information (like user ID, username, etc.) may be stored in req.user for the duration of the request lifecycle.


    // console.log(payload) // print the payload values that extracted after verification...
    req.user = {id:payload.id,username:payload.username};
    // console.log(req.user)
    next();
 }catch(error){
    return res.status(400).json({ success: false, 
        message: error.message });
 }
}

module.exports={authenticateUser};