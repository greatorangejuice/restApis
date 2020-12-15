import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) {}

    async validateUser(username: string, password: string):Promise<any> {
        console.log(`PASSWORD в AUTH: ${password}`)
        const user = await this.userService.findOneByName(username)
        console.log(`USER в AuthService: ${user[0].username}`)
        if (user && user[0].password === password) {
            return user[0]
        }
    }
}
