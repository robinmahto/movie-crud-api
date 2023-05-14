import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECERT } from '../config';

class JwtServices {

    static sign(payload: string | object, expiry='60s', secret : string | undefined = JWT_ACCESS_SECERT ){
        return jwt.sign(payload, secret, {expiresIn: expiry})
    }

    static verify(token: string, secret = JWT_ACCESS_SECERT){
        return jwt.verify(token, secret)
    }
    
}

export default JwtServices;