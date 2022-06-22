import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos(@Request() req: any) {
    return this.todoService.findAll(req.user.userId);
  }
  @Post()
  async createTodo(@Request() req: any, @Body() body: CreateTodoDto) {
    return this.todoService.create(req.user.userId, body);
  }
  @Get(':id')
  async getSingleTodo(@Request() req: any, @Param('id') todoId: number) {
    return this.todoService.findOneById(req.user.userId, todoId);
  }
  @Patch(':id')
  async updateTodo(
    @Request() req: any,
    @Body() payload: UpdateTodoDto,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.update(req.user.userId, todoId, payload);
  }
  @Delete(':id')
  async deleteTodo(
    @Request() req: any,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.deleteById(req.user.userId, todoId);
  }
}
