

const mongoose = require('mongoose');


const DB_URL="mongodb://localhost:27017/authentification_db";
// Connect to MongoDB
const databaseconnect=()=>{
    mongoose.connect(DB_URL) .then((conn) => {
    console.log(`Connected to MongoDB ${conn.connection.host}`);

 
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    // Handle the error gracefully, you might want to stop the application or perform other actions
  })
  
};
module.exports = databaseconnect;

