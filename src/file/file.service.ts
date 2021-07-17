import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { getRepository, Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { FileEntity } from "./file.entity";

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly FileRepsitory: Repository<FileEntity>
    ) { }

    async findeOne(id: string): Promise<FileEntity> {
        const file = await this.FileRepsitory.findOne({
            where: { id: id },
            select: ['originalname', 'path', 'filename', 'mimetype', 'created']
        })

        if (!file) {
            return null
        }

        return file
    }

    async saveFile(dto: CreateFileDto): Promise<FileEntity> {
        const {filename, originalname, mimetype, destination, path, size} = dto;


        let newFile = new FileEntity();
        newFile.originalname = originalname;
        newFile.mimetype = mimetype;
        newFile.destination = destination;
        newFile.filename = filename;
        newFile.path = path;
        newFile.size = size

        const errors = await validate(newFile);
        if (errors.length > 0) {
            const _errors = { file: 'Userinput is not valid' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)
        } else {
            const savedFile = await this.FileRepsitory.save(newFile);
            return savedFile;
        }
    }

}