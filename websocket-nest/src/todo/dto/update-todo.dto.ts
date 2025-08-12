import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

// UpdateTodoDtoはCreateTodoDto（id, name, created_atを含む）を継承
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
