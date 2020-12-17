import {HttpCode, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "../entities/task.entity";
import {Repository} from "typeorm";
import {CreateTaskDto} from "../dto/create-task.dto";
import {UsersService} from "../../users/users.service";
import {UpdateTaskDto} from "../dto/update-task.dto";
import {User} from "../../users/user.entity";

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(Task)
       private tasksRepository: Repository<Task>,
       private usersService: UsersService,
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = {...new Task(), ...createTaskDto, deadlineTime: new Date()}
        const customer = this.usersService.findOneByName('Sam')
        console.log(`CUSTOMER: ${JSON.stringify(customer)}`)
        // const customer = new User();
        // task.customer = customer
        try {
            return await this.tasksRepository.save(task);

        } catch(e) {
            throw new Error(e.message)
        }

    }

    async addExecutor(updateTaskDto: UpdateTaskDto) {

    }

    async getTasks(): Promise<Task[]> {
        return this.tasksRepository.find()
    }

    async getOneTaskById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne(id)
        if (task === undefined) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Task is not found'
            }, HttpStatus.NOT_FOUND)
        }
        return task
    }
}