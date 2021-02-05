import { Body, Controller, Get, HttpException, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserRO } from "./user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('users/login')
    async login(@Body() userData: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(userData)

        const errors = { User: 'not found' }
        if (!_user) throw new HttpException({ errors }, 401);

        const token = await this.userService.generatJWT(_user);
        const { email, username } = _user;
        const user = { email, token, username };
        return { user }
    }

    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }
}