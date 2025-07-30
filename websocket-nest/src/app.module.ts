import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EventModule, TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

