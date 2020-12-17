import {HttpCode, HttpException, HttpStatus, Injectable, Req} from "@nestjs/common";
import {DeleteResult, getManager, Repository} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./user-roles.entity";
import {validate} from "class-validator";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        // Validate func is not working with that:
        // const user = {...new User(), ...createUserDto}
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;

        const errors = await validate(user);
        if (errors.length > 0) {
          throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'User data is not valid'
          }, HttpStatus.FORBIDDEN)
        }

        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async findOneByName(username: string): Promise<User[]> {
        return await this.usersRepository.find({where: {"username": username}})
    }

    async findIdByName(username: string): Promise<User[]> {
        return await this.usersRepository.find({select: ["id"], where: {"username": username}})
    }

    async remove(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    async update(updateUserDto: UpdateUserDto, id: number) {
        try {
            const user = await this.usersRepository.findOneOrFail(id)
            console.log(user)
            const newUser = new User()
            user.username = updateUserDto.username;
            user.email = updateUserDto.email;
            user.password = updateUserDto.password;
            return this.usersRepository.save(newUser)
        }
        catch(e) {
            console.log(e.message)
            console.log("Not found")
            // @Req()
        }
    }

    async initDb(createRoleDto: CreateRoleDto): Promise<any> {
        const role = new Role();
        role.role = 'Admin';
    }
}