import {HttpCode, HttpStatus, Injectable, Req} from "@nestjs/common";
import {DeleteResult, Repository} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async findOneByName(username: string): Promise<User[]> {
        console.log(`Зашел в findByName ${username}`)
        return await this.usersRepository.find({where: {"username": username}})
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
}