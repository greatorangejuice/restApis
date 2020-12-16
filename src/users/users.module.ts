import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Role} from "./user-roles.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [
        UsersService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard
        // }
    ],
    controllers: [UsersController],
    exports: [UsersService]
})

export class UsersModule {}