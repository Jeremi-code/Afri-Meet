import jwt from 'jsonwebtoken'
import {z} from 'zod'

const SECRET_KEY = z.string()

const genToken = (user_id : Number) : string => {
    const valSecretKey = SECRET_KEY.parse(process.env.JWT_SECRET)
    const token = jwt.sign({user_id},valSecretKey,{expiresIn : '1h'})
    return token
}

export default genToken