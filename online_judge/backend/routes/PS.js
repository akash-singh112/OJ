const express = require('express');
const User1 = require('../problem-set/problemSchema.js');
const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const allOfThem = await User1.find({},{problem_name:1,_id:0,problem_status:1,tags:1,difficulty:1});
        res.status(200).json({message:'Fetch success',
        success:true,
        data:allOfThem
        });
    } catch (e) {
        console.error(e.message);
    }
})

module.exports = router;