import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {TasksService} from "./services/tasks.service";
import {TasksController} from "./controllers/tasks.controller";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Task]),
    ],
    providers: [TasksService],
    controllers: [TasksController],
})

export class TasksModule {}
