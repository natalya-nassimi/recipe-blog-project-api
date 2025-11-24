import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Unauthorised, Forbidden, NotFound } from '../utils/errors.js';

// * Model 
import USER from '../models/user.js';

const router = express.Router();

//* Routes
router.post("/sign-up",async(req,res, next)=>{
    console.log(req.body);
    try {
        const user = await USER.create(req.body);
        res.status(201).json(user)
    } catch (error) {
        next(error);
    }
})

router.post("/sign-in", async (req,res, next)=>{
    try {
        const {username, password} =  req.body;
        const user =  await USER.findOne({username: username});
        if(!user){
            throw new Unauthorised('Username not Found');
        }
        console.log(bcrypt.compareSync(password, user.password))
        if(!bcrypt.compareSync(password, user.password)){
            throw new Unauthorised('Password is incorrect');
        }

        const token = jwt.sign(
            {
                user: {
                    _id: user._id,
                    username: user.username,
                } 
            },
            process.env.TOKEN_SECRET,
            {expiresIn: "7d"}
        );
        
        res.json(token);
    } catch (error) {
        next(error)
    }
})
export default router;
