import { Body, Controller, Get, Headers, HttpException, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtDecode, UserRO } from "./user.interface";
import { UserService } from "./user.service";
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/login')
    async login(@Body() userData: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(userData)

        const errors = { User: 'not found' }
        if (!_user) throw new HttpException({ errors }, 401);

        const token = await this.userService.generatJWT(_user);
        const { email, username } = _user;
        const user = { email, token, username };
        return { user }
    }

    @Post('/')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @Get('/')
    async getUser(@Headers('Authorization') Authorization: string) {
        const decode = jwt.decode(Authorization.split(' ')?.[1]) as JwtDecode;
        return await this.userService.getUser(decode.email);
    }
}