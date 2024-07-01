import jwt from 'jsonwebtoken'
import { env } from '../env'

const PRIVATE_KEY = env.PRIVATE_KEY 
const PASSPHRASE = env.PASSPHRASE

const genToken = (user_id: Number, email: string): string => {
    try {
        const payload = { user_id, email }
        const token = jwt.sign(payload, { key: PRIVATE_KEY, passphrase: PASSPHRASE }, {algorithm:"RS256", expiresIn: '1h' })
        return token
    } catch(error) {
        throw new Error('Something Unknown happened')    
    }
}

export default genToken