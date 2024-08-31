import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT;
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddlewear.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

connectDB();

import cors from "cors"

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("API is running")
});

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>res.send({
    clientId:process.env.PAYPAL_CLIENT_ID
}));

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
