const express = require("express");
const router = express.Router();
const User1 = require('../problem-set/problemSchema.js')

router.post('/',async(req,res)=>{
    try {
        const {id,newStatus} = req.body;
        console.log(id);
        console.log(newStatus);
        const user11 = await User1.updateOne({_id:id},{$set:{problem_status:newStatus}});
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