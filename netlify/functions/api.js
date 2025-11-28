import serverless from 'serverless-http'
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

// * Routers / Controllers
import authRouter from '../../controllers/auth.js';
import recipeRouter from '../../controllers/recipe.js'
import errorHandler from '../../middleware/errorHandler.js';

const app = express();
// * Middleware
app.use(morgan("dev"));
app.use(cors());

// * Routes 
app.get("/", (req,res)=>{
    console.log("request hit this endpoint")
})
app.use("/auth", authRouter);
app.use("/recipes", recipeRouter);

app.use(errorHandler)
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

export const handler = serverless(app, {
  request: (req, event) => {
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (err) {
        req.body = {};
      }
    }
  }
});