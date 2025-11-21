import express, { urlencoded } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();

app.use(morgan('dev'))
app.use(urlencoded())


const connect =  async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Established connection to Database");
    } catch (error) {
        console.log("Failed to connect to database");
    }
}
connect();

app.listen(3000, ()=>{
    console.log('Server running on port 3000!')
})