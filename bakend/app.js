const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const cors = require("cors")

const databaseconnect=require("./database_connection/db_connection");
const {userRoute} =require("./Router/user_Route")


// database connection here !!!!!
databaseconnect();
// this will parse  the cookie...

// using cors property....
app.use(cors({
    origin:["http://localhost:5500","http://127.0.0.1:5500"],

    // origin:"http://localhost:5500",
    // origin:"http://127.0.0.1:5500",
    credentials:true
}))
app.use(cookieParser())
// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json()); // through using this you can also parse the sinralize data which coming from req.body from client side....

// using the routing feauture  of express.....
app.use("/",userRoute)  // here / is a prefix of every route......



// app.get('/',(req,res)=>{
//     res.send("hello this is express!!!!!!");
// });

module.exports=app;
