const express = require('express');
const User1 = require('../problem-set/problemSchema.js');
const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        const id = Object.keys(req.body)[0];
        //console.log(id);
        const oneOfThem = await User1.find({_id:id});
        //console.log(oneOfThem);
        res.status(200).json({message:'Fetch for showing success',
        success:true,
        data:oneOfThem
        });
    } catch (e) {
        console.error(e.message);
    }
})

module.exports = router;