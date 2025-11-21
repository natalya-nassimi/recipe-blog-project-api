import express, { urlencoded } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
// * Routers / Controllers
import authRouter from './controllers/auth.js';
import recipeRouter from './controllers/recipe.js'

const app = express();
// * Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded())

// * Routes 
app.get("/", (req,res)=>{
    console.log("request hit this endpoint")
})
app.use("/auth", authRouter);
app.use("/recipes", recipeRouter);

// * Connection
const connect =  async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Established connection to Database");
    } catch (error) {
        console.log("Failed to connect to database", error);
    }
}
connect();


app.listen(3000, ()=>{
    console.log('Server running on port 3000!')
})