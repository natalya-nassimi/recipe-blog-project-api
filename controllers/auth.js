import express from 'express';

// * Model 
import USER from '../models/user.js';

const router = express.Router();

//* Routes
router.post("/sign-up",async(req,res)=>{
    console.log(req.body);
    try {
        const user = await USER.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.post("/sign-in", (req,res)=>{

})
export default router;
