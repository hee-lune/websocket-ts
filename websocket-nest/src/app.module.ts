import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [EventModule, TasksModule],
})
export class AppModule {}
