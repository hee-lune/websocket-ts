import { Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TasksModule } from './tasks/tasks.module';
import { MailModule } from './utils/mail.module';

@Module({
  imports: [EventModule, TasksModule, MailModule],
})
export class AppModule {}
