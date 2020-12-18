import {Body, Controller, Param, Post, Get} from "@nestjs/common";
import {CreateTaskDto} from "../dto/create-task.dto";
import {TasksService} from "../services/tasks.service";

@Controller('tasks')
export class TasksController {
    constructor(
        private taskService: TasksService,
    ) {}

    @Get('getOne/:id')
    getTask(@Param('id') id: number) {
        return this.taskService.getOneTaskById(id);
    }

    @Get()
    getAllTasks() {
        return this.taskService.getTasks()
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Get('executor')
    getTasks() {
        return this.taskService.getUsersAllTasks(27)
    }

    updateTask() {

    }
}