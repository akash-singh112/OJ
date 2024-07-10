const express = require('express');
const router = express.Router();
const User = require('../database/user.js');
const bcrypt = require('bcryptjs');

router.post('/',async(req,res)=>{
    const {
        id:id,
        currentPass:currentPass,
        newPass:newPass
    } = req.body;

    try {
        const user = await User.findById(id);

        const correct = await bcrypt.compare(currentPass,user.password);
        if(!correct){
            return res.status(400).send({message:'Incorrect current password'});
        }

        const newHash = await bcrypt.hash(newPass,15);

        const acknowledge = await User.updateOne({_id:id},{$set:{password:newHash}});

        res.status(201).send({
            message:"Changing password was successful",
            success:true,
            acknowledge:acknowledge
        });
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;