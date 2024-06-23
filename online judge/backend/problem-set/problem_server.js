const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async () =>{
    const url = process.env.mongourl_problemset;
    try {
        await mongoose.connect(url);
        console.log('Connected to problemset DB!!');
    } catch (error) {
        console.log('Error in connecting to problemset DB ', error.message);
    }
}

module.exports = {DBConnection};