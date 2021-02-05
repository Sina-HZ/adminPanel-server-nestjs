import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/file/file.entity";
import { UserEntity } from "src/user/user.entity";
import { SliderController } from "./slider.controller";
import { SliderEntity } from "./slider.entity";
import { SliderService } from "./slider.service";



@Module({
    imports: [TypeOrmModule.forFeature([SliderEntity,FileEntity,UserEntity])],
    providers: [SliderService],
    controllers: [
        SliderController
    ],
})

export class SliderModule {}