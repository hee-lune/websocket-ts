import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data: createTaskDto });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }
}
