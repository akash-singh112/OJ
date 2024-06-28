const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    problem_status:{
        //0=unsolved and not marked for solve later
        //1=unsolved and marked for solve later
        //2=solved
        type:Number,
        required:true,
        default:0
    },
    tags:{
        type:[String],
    },
    difficulty:{
        type:Number,
        required:true,
        min:500,
        max:5000
    },
    problem_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    value_constraints:{
        type:[String],
        required:true
    },
    input_description:String,
    output_description:String,
    sampleTestCases:[String],
    outputOfSampleTestCases:[String],
    hiddenTestCases:[String],
    outputOfHiddenTestCases:[String]
})

userSchema.statics.createProblem = async function(entireProblem){
    await this.create(entireProblem);
    //await this.save();
    //console.log(entireProblem);
}

userSchema.statics.findviaId = async function(id){//also remember to use await before calling this function
    const user = await this.where('_id').equals(id).limit(1);
    return user;
}

userSchema.statics.findbyName = async function(name){
    const user = await this.where('problem_name').equals(name).limit(1);
    return user;
}

module.exports = mongoose.model('User1',userSchema);