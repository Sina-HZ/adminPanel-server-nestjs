import { IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../userEnums";

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly role: UserType
}