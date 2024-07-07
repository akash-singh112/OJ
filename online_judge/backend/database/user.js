const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        default:null
    },
    middlename:{
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    problems_solved:{//if a problem is solved, this schema will have id of that problem present else not
        type:[String]
    },
    address_line1:String,
    address_line2:String,
    address_line3:String,
    address_line4:String,
    state:String,
    zipcode:String,
    dob:String,
    contact_no:String
})

module.exports = mongoose.model('User',userSchema);