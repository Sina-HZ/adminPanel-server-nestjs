import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { FileEntity } from "src/file/file.entity";
import { getRepository, Repository } from "typeorm";
import { CreateSliderDto } from "./dto/create-slider.dto";
import { SliderEntity } from "./slider.entity";
import * as jwt from 'jsonwebtoken';
import { UserEntity } from "src/user/user.entity";


@Injectable()
export class SliderService {
    constructor(
        @InjectRepository(SliderEntity)
        private readonly sliderRepository: Repository<SliderEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepsitory: Repository<FileEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepsitory: Repository<UserEntity>
    ) { }

    async list() {
        const sliders = await getRepository(SliderEntity).createQueryBuilder('slider')
            .innerJoin("slider.createdBy", "user")
            .innerJoin("slider.image", "image")
            .select(['slider.id',
                'slider.name',
                'slider.image',
                'slider.status',
                'slider.removedAt',
                'slider.created',
                'slider.updated',
                'image.id',
                'image.removedAt',
                'image.created',
                'image.updated',
                'user.id',
                'user.username',
                'user.email'])
            // .where('slider.status = :status', { status: 'active' })

        const slidersList = await sliders.getMany()
        return slidersList
    }

    async create(dto: CreateSliderDto) {
        const { name, image, status, token } = dto;

        const qb = await this.fileRepsitory.findOne({ where: { id: image } });
        if (!qb) {
            const _errors = { slider: 'imageId is not valid' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)
        }

        const userId = jwt.decode(token) as any;
        const user = await this.userRepsitory.findOne({ where: { id: userId.id } });

        let newSlider = new SliderEntity();
        newSlider.name = name;
        newSlider.image = qb;
        newSlider.status = status;
        newSlider.createdBy = user;

        const errors = await validate(newSlider);

        if (errors.length > 0) {
            const _errors = { slider: 'Userinput is not valid' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)
        } else {
            const savedSlider = await this.sliderRepository.save(newSlider);
            return savedSlider;
        }
    }
}