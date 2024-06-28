import express from 'express'
import dotenv from 'dotenv'

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();

