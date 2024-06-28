const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnectionProblemSet = async () =>{
    const url = process.env.mongourl_problemset;
    try {
        mongoose.createConnection(url);
        console.log('Connected to problemset DB!!');
    } catch (error) {
        console.log('Error in connecting to problemset DB ', error.message);
    }
}

module.exports = {DBConnectionProblemSet};