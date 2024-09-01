const mongoose=require('mongoose');
require('dotenv').config();
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB!");
    }
    catch(err){
        console.log("Error has Occured!",err);
        process.exit(1); 
    }
}

module.exports = connectDb;