const express = require('express');
const router = express.Router();
const User = require('../database/user.js')

router.post('/',async(req,res)=>{
    const {
        address_line1:address_line1,
        address_line2:address_line2,
        address_line3:address_line3,
        address_line4:address_line4,
        state1:state1,
        zipcode:zipcode,
        dob:dob,
        contact_no:contact_no,
        id:id
    } = req.body;

    console.log(id);

    try {
        const result = await User.updateOne({_id:id},{$set:{
            address_line1:address_line1,
            address_line2:address_line2,
            address_line3:address_line3,
            address_line4:address_line4,
            state:state1,
            zipcode:zipcode,
            dob:dob,
            contact_no:contact_no
        }});
        console.log(result);
        res.status(200).send({
            message:"Updation success",
            success:true,
            newUser:result
        })
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;