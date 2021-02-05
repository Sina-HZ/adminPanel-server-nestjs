import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateFileDto {

    @IsNotEmpty()
    readonly originalname: string;

    @IsNotEmpty()
    readonly mimetype: string;

    @IsNotEmpty()
    readonly destination: string;

    @IsNotEmpty()
    readonly filename: string

    @IsNotEmpty()
    readonly path: string

    @IsNotEmpty()
    readonly size: number
}