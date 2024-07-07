const express = require("express");
const router = express.Router();
const User = require('../database/user.js')

router.post('/',async(req,res)=>{
    try {
        const {id,problem_id,newStatus} = req.body;
        console.log('yahans');
        console.log(newStatus);
        console.log(problem_id);
        var user11;
        if(newStatus){
            console.log('lol');
            user11 = await User.updateOne({_id:id},{$push:{problems_solved:problem_id}});
        }
        else{
            console.log('lol1');
            user11 = await User.updateOne({_id:id},{$pop:{problems_solved:problem_id}});
        }
        res.status(200).send({
            message:"Status change success",
            success:true,
            updatedUser:user11
        })
    } catch (error) {
        res.status(400).send({
            message:"Error in updating status",
            success:false,
            updatedUser:undefined
        })
    }
})

module.exports = router