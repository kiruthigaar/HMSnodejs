import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()

export const newAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_KEY,
        {expiresIn: '30s'}
    )
}