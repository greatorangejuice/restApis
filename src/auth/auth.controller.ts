import {Controller, Post, UseGuards, Request, HttpCode, HttpStatus} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}