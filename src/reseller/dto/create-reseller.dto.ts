import { IsNotEmpty } from "class-validator";

export class CreateResellerDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    phone: string[];

    @IsNotEmpty()
    address: string
}