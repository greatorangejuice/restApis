import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {DeleteResult} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";
import {GetUserDto} from "./dto/get-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {ERole} from "../common/enums/role.enum";
import {Roles} from "../common/decorators/roles.decorator";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Post('/test')
    find(@Body() getUserDto: GetUserDto) {
        console.log(`Controller: ${getUserDto.username}`)
        return this.usersService.findOneByName(getUserDto.username);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @Roles(ERole.User)
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @Roles(ERole.Admin)
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.usersService.remove(id);
    }

    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
        return this.usersService.update(updateUserDto, id)
    }

    // @Get('tasks')
    // getTasks() {
    //     return this.usersService.getUserTasks()
    // }
}
