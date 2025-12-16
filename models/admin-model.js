const mongoose=require('mongoose');

const AdminSchema= mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:String,
    products:{
        type:Array,
        default:[]
    },
    picture: String,
    gstin:String, 
});

module.exports=mongoose.model('Admin',AdminSchema);