import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {DeleteResult} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";
import {GetUserDto} from "./dto/get-user.dto";

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

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.usersService.remove(id);
    }

    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
        return this.usersService.update(updateUserDto, id)
    }
}
