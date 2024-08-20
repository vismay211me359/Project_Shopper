import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

import users from "./data/users.js"
import products from "./data/products.js"

import User from "./models/userModel.js"
import Product from "./models/productModel.js"

import Order from "./models/orderModel.js"

import connectDB from "./config/db.js"

connectDB();

const importData=async()=>{
    try{
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers=await User.insertMany(users);
        const adminUser=createdUsers[0]._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser};
        })
        const createdProducts=await Product.insertMany(sampleProducts);

        console.log("Data Imported !!!!");
        process.exit();

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

const destroyData=async()=>{
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed !!!!");
        process.exit();
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}
else{
    importData();
}