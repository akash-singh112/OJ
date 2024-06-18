const express = require('express');
const {DBConnection} = require('./database/db.js');
const dotenv = require('dotenv');
const User = require('./database/user.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
dotenv.config();

const port = 8080;
const app = express();

//add middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/home',(req,res)=>{
    res.send('Welcome to Home Page\n')
    res.end();
});

DBConnection();
app.post('/register',async (req,res)=>{
    try {
        //get all details of user from user-> stored in req.body
        console.log(req);
        const {firstname,middlename,lastname,email,password} = req.body;

        //check for empty fields:if any then give flag
        if(!firstname || !email || !password){
            return res.status(406).send('Please enter all required fields');
        }

        //check if user already exists in DB
        const ifExisting = await User.findOne({email})//as email parameter is set to unique
        console.log(ifExisting);
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
        user1.tkn = user1;
        //for security reasons, also we dont need password anymore so discarding it
        user1.password = undefined;
        //200 => successful
        res.status(200).json({message : 'Registration successful' , user1});
    } catch (error) {
        console.log(error);
    }

})

app.post('/login',async (req,res)=>{

})

app.get('/:universalURL',(req,res)=>{
    res.send("Status 404 : URL not found");
    res.end()
})

app.listen(port,()=>{
    console.log('Server is listening to port 5500');
})

