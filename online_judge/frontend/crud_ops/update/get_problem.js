const express = require('express');
const User1 = require('../../../backend/problem-set/problemSchema.js') ;
const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        const problem_name = Object.keys(req.body)[0];
        const oneProb = await User1.findOne({problem_name:problem_name},{_id:0});
        res.status(200).json({message:'Fetch updating success',
        success:true,
        data:oneProb
        });
    } catch (e) {
        console.error(e.message);
    }
})

module.exports = router;