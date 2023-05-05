import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDTO } from "src/users/DTO/user.dto";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt";
import { JwtStrategy } from "./auth.stategy";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/user.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "src/users/DTO/login.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly userService: UserService,
        private readonly jwtStrategy: JwtStrategy,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
            
    ){}

    async register(user: UserDTO){
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(user.password,salt )
        if(!user.email || !user.password){
            throw new HttpException("Invalid password or email", HttpStatus.BAD_REQUEST)
        } 
        const isExist = await this.userService.getByEmail(user.email)
            if(isExist) throw new HttpException("Account with this email already exists", HttpStatus.CONFLICT)

        const newUser = this.userService.creatUser({
            id: user.id,
            email: user.email,
            password: hashPassword,
            salt 
        })
            return newUser
        }

        async login (email: string, password: string){
           const user = await this.validateUser({email, password})
           const payload ={email : user.email, id : user.id}
           const accessToken = await this.jwtStrategy.generateToken(payload)
           return {
            accessToken
           }
           
        }

        async hashPassWord (passWord: string, salt : string): Promise<string> {
            return bcrypt.hash(passWord, salt)
        }
        async validateUser({email, password}: LoginDTO) {
            const user = await this.userRepository.findOne({where : {email}})
            
           
            if(!user){
                throw new HttpException("User not found", HttpStatus.UNAUTHORIZED)

            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!isValidPassword) {
                throw new HttpException("Wrong password or email", HttpStatus.UNAUTHORIZED)
            }
             return user

            
            
        }
}