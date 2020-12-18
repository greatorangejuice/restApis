import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "../entities/task.entity";
import {Repository} from "typeorm";
import {CreateTaskDto} from "../dto/create-task.dto";
import {UsersService} from "../../users/users.service";
import {UpdateTaskDto} from "../dto/update-task.dto";

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(Task)
       private tasksRepository: Repository<Task>,
       private usersService: UsersService,
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = {...new Task(), ...createTaskDto, deadlineTime: new Date(Date.now() + 2*24*60*60*1000)}
        try {
            task.executor = await this.usersService.findOne('27');
            return await this.tasksRepository.save(task);

        } catch(e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: e.message,
            }, HttpStatus.FORBIDDEN)
        }
    }

    async getUsersAllTasks(userId: number) {
        return await this.tasksRepository.find({where: {executor: userId}})
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


    async addExecutor(updateTaskDto: UpdateTaskDto) {

    }

    async getTasks(): Promise<Task[]> {
        return this.tasksRepository.find({cache: 60000})
    }
}