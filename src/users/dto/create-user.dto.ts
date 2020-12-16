import {Role} from "../../common/enums/role.enum";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    // roles: Role[];
}