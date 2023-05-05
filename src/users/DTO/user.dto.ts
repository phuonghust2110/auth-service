import { Expose } from "class-transformer"
import { IsNotEmpty } from "class-validator"
export class UserDTO {
    @Expose() 
    id: number
    @Expose()
    email : string  

    @IsNotEmpty()
    password : string
    
    salt : string
}