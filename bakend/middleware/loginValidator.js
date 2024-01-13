const loginValidator=(req,res,next)=>{
    const {username,password}=req.body;
    if(username && password){
        next();
    }
    else{
        res.status(404).send({msg:"all Input Fields are required"})

    }
}

module.exports={loginValidator};