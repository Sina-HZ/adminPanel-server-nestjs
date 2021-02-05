import { IsNotEmpty, IsOptional } from "class-validator";
import { FileEntity } from "src/file/file.entity";

export class CreateSliderDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly image: FileEntity;

    @IsOptional()
    readonly status: 'deactive' | 'active';

    @IsNotEmpty()
    readonly token: string
}