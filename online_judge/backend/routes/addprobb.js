const express = require('express');
const User1 = require('../problem-set/problemSchema.js')
const router = express.Router();

router.post('/',async (req,res)=>{
    try {
        let {tags,difficulty,problem_name,description,value_constraints,input_description,output_description,sampleTestCases,outputOfSampleTestCases,hiddenTestCases,outputOfHiddenTestCases} = req.body;
        
        sampleTestCases = sampleTestCases.split(',')
        outputOfSampleTestCases = outputOfSampleTestCases.split(',')
        hiddenTestCases = hiddenTestCases.split(',')
        outputOfHiddenTestCases = outputOfHiddenTestCases.split(',')
        value_constraints = value_constraints.split(',')
        tags = tags.split(',');
        
        User1.createProblem({
            tags:tags,
            difficulty:difficulty,
            problem_name:problem_name,
            description:description,
            value_constraints:value_constraints,
            input_description:input_description,
            output_description:output_description,
            sampleTestCases:sampleTestCases,
            outputOfSampleTestCases:outputOfSampleTestCases,
            hiddenTestCases:hiddenTestCases,
            outputOfHiddenTestCases:outputOfHiddenTestCases
        });

        const added_prob = await User1.where('problem_name').equals(problem_name).limit(1);

    res.status(200).json({message:'Problem addition successful!',
        success:true,
        data:added_prob
    })
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router
