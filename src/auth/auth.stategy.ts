
import { HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
export class JwtStrategy {
     generateToken({email} :any){
        const accessToken = jwt.sign({email},process.env.SECRET_KEY, {expiresIn:"1h"})
        return accessToken
    }

    async verifyToken(token:string, secretKey : string){
        
        
         return jwt.verify(token,secretKey)
        
    }


}