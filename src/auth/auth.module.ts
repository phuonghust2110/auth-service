import { Global, Inject, Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/users/user.module";
import { JwtStrategy } from "./auth.stategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/user.entity";
import { JwtAuthGuard } from "./guard/auth.guard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';
import { jwtConstants } from "./jwt.constains";
dotenv.config()

@Global()
@Module({
    
    imports: [TypeOrmModule.forFeature([UserEntity]),
    
     UserModule,
     
        
    
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtService,],
    exports: [AuthService, JwtStrategy, JwtAuthGuard, JwtService]
})

export class AuthModule {
    
}