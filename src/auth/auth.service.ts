import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string):Promise<any> {
        console.log(`PASSWORD в AUTH: ${password}`)
        const user = await this.userService.findOneByName(username)
        console.log(`USER в AuthService: ${user[0].username}`)
        if (user && user[0].password === password) {
            return user[0]
        }
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
