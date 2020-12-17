import {ERole} from "../../common/enums/role.enum";

export class UpdateUserDto {
    username: string;
    email: string;
    password: string;
    roles: ERole[];
}