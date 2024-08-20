import express from "express";
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
const port =process.env.PORT;
import productRoutes from "./routes/productRoutes.js"
import { notFound,errorHandler } from "./middleware/errorMiddlewear.js";

connectDB();

import cors from "cors"

const app=express();
app.use(cors());



app.get('/',(req,res)=>{
    res.send("API is running")
});

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
