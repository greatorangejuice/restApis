import {Controller, Post, UseGuards, Request, HttpCode, HttpStatus} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log(`REQ ${req}`)
        return this.authService.login(req.user);
    }
}