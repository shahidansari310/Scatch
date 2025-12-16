const express=require('express');
const app=express();
const path=require("path");
require('dotenv').config()
const cookieParser=require('cookie-parser');
const PORT= process.env.PORT || 4000;
const connectDb = require('./config/db');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
 
app.get('/',(req,res)=>{
    res.send('Home Page!');
})

connectDb();

app.listen(PORT,()=>{
    console.log(`App running on port :${PORT}`);
})
