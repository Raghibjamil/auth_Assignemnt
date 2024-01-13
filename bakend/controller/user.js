const UserModel=require("../db_Schema/Shema_creation");
const bcrypt=require("bcrypt");


// user Signup .........
const userSignUp=async (req,res,next)=>{

    try {
    

        const newUser=await UserModel.create(req.body);
        res.status(200).send({
            msg:"SignUp Success"
        })
    } catch (e) {
        if (e.code === 11000) {
            res.send({message:'Duplicate key error: The document already exists.'});
            // Handle the duplicate key error as needed
          } 
          else{
            res.status(501).send({msg:error.message})

          }
    }

}




// user login...........
const userlogin= async (req,res,next)=>{
const {username,password}=req.body;
try{
const getuserData=await UserModel.findOne({username}).select("+password");
// this check is used for finding the account of user is exist or not.....
if(getuserData && getuserData.username){
    const result = await bcrypt.compare(password,getuserData.password);

    if(result){
        const token=await getuserData.jwtToken();
        console.log(token);
        const cookieOption={
            maxAge:24*60*60*1000, // 24hr
            httpOnly:true //  not able to modify  the cookie in client side
            
        };
        // "token" is cookie name....
        res.cookie("token",token,cookieOption);
        res.status(200).json({
            success:true,
            data:getuserData
        });

    }else{
        res.status(404).send({msg:"Password is Incorrect, Try Again!"})
    }

}else{
    res.status(404).send({msg:"No Account Found Associated with this username"})
}
    
}catch(error) {
    res.status(501).send({msg:error.message})
}
}


module.exports={userSignUp,userlogin}