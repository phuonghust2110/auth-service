import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "../auth.service";
import { JwtStrategy } from "../auth.stategy";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private reflector : Reflector,
        private readonly jwtStrategy : JwtStrategy,
        private readonly jwtService : JwtService
        ){


    }
    
    

     async validateRequest(request: Request): Promise<boolean>{
       const token = request.headers['authorization'].split(" ")[1];
       if(!token ) return false
       try{
        return !! await this.jwtStrategy.verifyToken(token , process.env.SECRET_KEY)
       }
       catch {
        return false
       }
    }

    async canActivate (context : ExecutionContext) : Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        if(!(await this.validateRequest(request))){
            throw new UnauthorizedException()
        }
        return true
        
       
      }
}

