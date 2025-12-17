const mongoose=require('mongoose');

const UserSchema= mongoose.Schema({
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
    cart:{
        type:Array,
        default:[]
    },
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture: String
});

module.exports=mongoose.model('User',UserSchema);