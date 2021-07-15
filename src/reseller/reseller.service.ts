import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import { CreateResellerDto } from "./dto/create-reseller.dto";
import { ResellerEntity } from "./reseller.entity";

@Injectable()
export class ResellerService {
    constructor(
        @InjectRepository(ResellerEntity)
        private readonly resellerRepository: Repository<ResellerEntity>
    ) { }

    async findAll() {
        const findeResult = await this.resellerRepository.find();
        return findeResult
    }

    async findOne(id: string){
        const find = await this.resellerRepository.findOne(id);
        if(!find){
            return null
        }

        return find
    }

    async create(dto: CreateResellerDto) {
        const { name, province, city, address, phone } = dto;
        let newReseller = new ResellerEntity();
        newReseller.name = name;
        newReseller.province = province;
        newReseller.city = city;
        newReseller.phone = phone;
        newReseller.address = address;

        const errors = await validate(newReseller);
        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)
        } else {
            const savedReseller = await this.resellerRepository.save(newReseller);
            return savedReseller;
        }
    }
}