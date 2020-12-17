import {ERole} from "../../common/enums/role.enum";


export class CreateUserDto {
    username: string;
    email: string;
    password: string;
}