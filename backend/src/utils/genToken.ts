import jwt from 'jsonwebtoken'
import { env } from '../env'

const PRIVATE_KEY = env.PRIVATE_KEY
const PASSPHRASE = env.PASSPHRASE

const genToken = (user_id: Number): string => {
    const token = jwt.sign({ user_id }, { key: PRIVATE_KEY, passphrase: PASSPHRASE }, { expiresIn: '1h' })
    return token
}

export default genToken