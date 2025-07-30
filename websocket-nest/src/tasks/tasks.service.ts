import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      ...createTaskDto,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }
}
