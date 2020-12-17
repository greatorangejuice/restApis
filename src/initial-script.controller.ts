import {Body, Controller, Get, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./users/user-roles.entity";
import {Repository} from "typeorm";
import {CreateRoleDto} from "./users/dto/create-role.dto";
import {UsersService} from "./users/users.service";

@Controller('initial')
export class InitialScriptController {
    constructor(
        private usersService: UsersService
    ) {
    }
    @Post()
    initRoles(@Body() createRoleDto: CreateRoleDto) {
        return this.usersService.initDb(createRoleDto)
    }
}