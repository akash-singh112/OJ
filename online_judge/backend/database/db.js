const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const DBConnection = async()=>{
    const MONGO_URL = process.env.MONGO_URL;
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connection to database is successful');
    } catch (error) {
        console.error(`Error occured while connecting with database: ${error.message}`);
    }
}

module.exports = {DBConnection};
