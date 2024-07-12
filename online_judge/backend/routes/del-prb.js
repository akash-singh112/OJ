const express = require('express')
const User1 = require('../problem-set/problemSchema.js');

const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        //
        const problem_name = Object.keys(req.body)[0];
        //
        await User1.deleteOne({problem_name:problem_name});
        res.status(201).send({message:'Deletion successful!',
            success:true,
            deletedprobname:problem_name
        });
    } catch (error) {
        console.error(e.message);
    }
})

module.exports = router;