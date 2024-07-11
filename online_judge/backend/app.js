const express = require('express');
const {DBConnection} = require('./database/db.js');
const dotenv = require('dotenv');
const User = require('./database/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const AddProb = require('./routes/addprobb.js');
const PS = require('./routes/PS.js');
const DeleteProblem = require('./routes/del-prb.js');
const GetProb = require('./routes/get_problem.js');
const updateProblem = require('./routes/update-problem.js');
const getting = require('./routes/getforshow.js');
const statusChangeCode = require('./routes/changeStatus.js');
const getbyName = require('./routes/getviaName.js');
const updateUser = require('./routes/updateUser.js');
const updatePass = require('./routes/updatePass.js');
dotenv.config();

//run on http://localhost:port/{ur_wish}
const app = express();

//add middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/home',(req,res)=>{
    res.send('Welcome to Home Page\n')
    res.end();
});

DBConnection();

app.post('/register',async (req,res)=>{
    try {
        //get all details of user from user-> stored in req.body
        //console.log(req);
        const {firstname,middlename,lastname,email,password} = req.body;

        //check for empty fields:if any then give flag
        if(!firstname || !email || !password){
            return res.status(406).send('Please enter all required fields');
        }

        //check if user already exists in DB
        const ifExisting = await User.findOne({email})//as email parameter is set to unique
        //console.log(ifExisting);
        if(ifExisting){
            return res.send('This user already exists! Please try to login');
        }

        //encrypt the password
        const hashedvalue = await bcrypt.hash(password,15);

        //store in database
        const user1 = await User.create({
            firstname,
            middlename,
            lastname,
            email,
            password : hashedvalue
        })

        //generate secret token 
        const tkn = jwt.sign({id:user1._id,email},process.env.SECRET_KEY,{
            expiresIn:'1h'
        });
        user1.tkn = tkn;
        //for security reasons, also we dont need password anymore so discarding it
        user1.password = undefined;
        //200 => successful
        res.status(200).json({message : 'Registration successful' , user1});
    } catch (error) {
        console.log(error.message);
    }

})

app.post('/login',async (req,res)=>{
    try {
        //get user details
        const {email,password} = req.body;

        //check if both email and password are filled up
        if(email==undefined || password==undefined){
            return res.status(400).send('Please enter all fields');
        }

        //check if user exists in DB
        const user = await User.findOne({email});
        if(user==undefined){
            return res.status(400).send('This user does not exist');
        }

        //check for correctpassword
        const correct = await bcrypt.compare(password,user.password);
        if(!correct){
            return res.status(400).send('Incorrect password');
        }

        //find name of user
        const name11 = user.firstname;

        //generate jwt token for secure access
        const tkn = jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn:'1h'
        });
        user.tkn = tkn;
        user.password = undefined;

        //store cookies and send successful login message
        res.status(200).cookie('cookie1',tkn,{ maxAge : 360000 , httpOnly:true }).json({
            message:'Login successful!',
            success:true,
            name:name11,
            userData:user
        });

    } catch (error) {
        //console.log('galat hai aap');
        console.log(error.message);
    }
})

app.use('/addprob',AddProb);
app.use('/ps',PS);
app.use('/delprob',DeleteProblem);
app.use('/getprob',GetProb);
app.use('/updaterecord',updateProblem);
app.use('/getforshow',getting);
app.use('/changestatus',statusChangeCode);
app.use('/fetchbyname',getbyName);
app.use('/updateuserinfo',updateUser);
app.use('/changepass',updatePass);

app.get('/:universalURL',(req,res)=>{
    res.send("Status 404 : URL not found");
    res.end();
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port ${process.env.port}`);
})

