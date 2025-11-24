import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { Unauthorised } from '../utils/errors.js'

const isSignedIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) throw new Unauthorised('Unauthorised')

        const token = authHeader.split(' ')[1]

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = await User.findById(payload.user._id)

        if(!user) throw new Unauthorised('User not found')
        
        req.user = user
        next()

    } catch (error) {
        next(error)
    }
}

export default isSignedIn