import { IsNotEmpty, IsOptional } from "class-validator";
import { FileEntity } from "src/file/file.entity";
import { SliderStatus } from "../sliderEnum";

export class CreateSliderDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly image: FileEntity;

    @IsOptional()
    readonly status: SliderStatus;

    @IsNotEmpty()
    readonly token: string
}