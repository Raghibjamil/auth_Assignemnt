
require('dotenv').config();

const app=require('./app');

const PORT=process.env.PORT||5002;
// const PORT=8000;

app.listen(PORT,()=>{

    console.log(`Server is listening at http://localhost${PORT}`);
   

});

