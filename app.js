const express=require('express');
const app=express();
const path=require("path");
require('dotenv').config()
const cookieParser=require('cookie-parser');
const PORT= process.env.PORT || 4000;
const connectDb = require('./config/db');
const usermodel=require('./models/user-model');
const productmodel=require('./models/product-model');
const adminmodel=require('./models/admin-model');
const adminRoute=require('./routes/adminRoute')
const usersRoute=require('./routes/usersRoute')
const productsRoute=require('./routes/productsRoute')

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
connectDb();
 
app.use('/admin',adminRoute);
app.use('/users',usersRoute);
app.use('/products',productsRoute);

app.listen(PORT,()=>{
    console.log(`App running on port :${PORT}`);
})
