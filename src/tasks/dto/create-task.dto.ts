export class CreateTaskDto {
    id: number;
    taskName: string;
    description: string;
    orderTime: Date;
    deadlineTime: Date;
    // customer: string;
    // executor: string | null;
}