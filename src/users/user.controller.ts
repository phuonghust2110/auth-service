import { Body, Controller, Get, Inject, Post, Req, UseGuards, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./DTO/user.dto";
import { AuthService } from "src/auth/auth.service";
import { LoginDTO } from "./DTO/login.dto";
import { JwtAuthGuard } from "src/auth/guard/auth.guard";


@Controller("users")
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly authGuard: JwtAuthGuard
        ){
        
    }

    @Post('register')
    async register(@Body() user: UserDTO) {
        return this.authService.register(user)
    }

    @Post('login')
    async login (@Body() user: LoginDTO){
        return this.authService.login(user.email, user.password)
    }

    @Get('getUser')
    @UseGuards(JwtAuthGuard)
    async getUser() {
        console.log("hello")
    }
}