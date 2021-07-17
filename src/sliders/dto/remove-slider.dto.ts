import { IsNotEmpty, IsOptional } from "class-validator";

export class RemoverSliderDto {

    @IsNotEmpty()
    readonly sliderId: string

    @IsNotEmpty()
    readonly token: string
}