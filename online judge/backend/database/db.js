const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const DBConnection = async()=>{
    const MONGO_URL = process.env.MONGO_URL;
    try {
        await mongoose.connect(MONGO_URL,{useNewURLParser:true,useUnifiedTopology:true})
        console.log('Connection to database is successful');
    } catch (error) {
        console.log(`Error occured while connectiong with database: ${error.message}`);
    }
}

module.exports = {DBConnection};
