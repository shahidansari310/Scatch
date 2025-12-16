require('dotenv').config()
const express=require('express');
const app=express();
const path=require("path");
const cookieParser=require('cookie-parser');
const PORT= process.env.PORT || 4000;
const connectDb = require('./config/db');
const adminRoute=require('./routes/adminRoute')
const usersRoute=require('./routes/usersRoute')
const productsRoute=require('./routes/productsRoute')

connectDb();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

 
app.use('/admin',adminRoute);
app.use('/users',usersRoute);
app.use('/products',productsRoute);

app.listen(PORT);
