const express = require("express");
const router = express.Router();
const User1 = require('../problem-set/problemSchema.js')

router.post('/',async(req,res)=>{
    try {
        const {name} = req.body;
        const requser = await User1.findbyName(name);
        res.status(200).send({
            message:"Fetched by name",
            success:true,
            user:requser
        })
    } catch (error) {
        res.status(400).send({
            message:"Fetch by name unsuccessful",
            success:false,
            user:undefined
        })
    }
})

module.exports = router