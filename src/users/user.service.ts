import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./DTO/user.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>
   ){}

   async creatUser(user: UserDTO) {
      const newUser = this.userRepository.create(user);
       await this.userRepository.save(newUser);
       return plainToInstance(UserDTO,newUser, {excludeExtraneousValues: true});
   }

   async getByEmail(email: string){
      const getUser = this.userRepository.findOne({where: {email: email}})
      if(getUser) return getUser
      if(!getUser) throw new HttpException("Account with this email does not exist", HttpStatus.UNAUTHORIZED)
   }

   
}

