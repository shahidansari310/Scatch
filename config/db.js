const mongoose=require("mongoose");
const dbgr=require('debug')("development:mongoose");

const connectDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        dbgr("DB Connected Sucessfully");

    } catch (error) {
        dbgr(error);
        process.exit(1);
    }
}

module.exports=connectDb;