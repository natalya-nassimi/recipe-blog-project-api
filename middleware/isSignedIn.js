import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const isSignedIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) throw new Error('no header found')

        const token = authHeader.split(' ')[1]

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = await User.findById(payload.user._id)

        if(!user) throw new Error('user not found')
        
        req.user = user
        next()

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: 'Unauthorised' })
    }
}

export default isSignedIn