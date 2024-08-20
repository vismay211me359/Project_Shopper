import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const uri=process.env.MONGO_URI;

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(uri);
        console.log(`Mongodb Connected : ${conn.connection.host}`);
    }catch(err){
        console.log('Could not connect to MongoDB :', err.message);
        process.exit(1);
    }
};

export default connectDB;