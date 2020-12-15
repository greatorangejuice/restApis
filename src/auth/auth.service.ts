import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) {}

    async validateUser(username: string, password: string):Promise<any> {
        const user = await this.userService.findOneByName(username)
        console.log(user)
    }
}
