import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { getRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserRO } from "./user.interface";
import * as jwt from 'jsonwebtoken';
import { SECRET } from "src/config";
import * as argon2 from 'argon2';
import { LoginUserDto } from "./dto/login-user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email }, select: ['email', 'id', 'role', 'username', 'password'] });

        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            delete user.password;
            return user;
        }

        return null;
    }

    async getUser(email: string) {

        const user = await this.userRepository.findOne({ where: { email }, select: ['email', 'id', 'role', 'username'] });
        
        if (!user) {
            return null;
        }

        return user
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        const { username, email, password, role } = dto;
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email })

        const user = await qb.getOne();

        if (user) {
            const errors = { username: 'Username and email must be unique.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST)
        }

        if (!['staf', 'admin'].includes(role)) {
            const errors = { role: 'must be on of "staf" or "admin".' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST)
        }

        let newUser = new UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.role = role

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)
        } else {
            console.log('newUser: ', newUser)
            const savedUser = await this.userRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }
    }

    public generatJWT(user: UserEntity) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getDate() / 1000
        }, SECRET)
    }

    private buildUserRO(user: UserEntity) {
        const userRo = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: this.generatJWT(user)
        }

        return { user: userRo }
    }
}