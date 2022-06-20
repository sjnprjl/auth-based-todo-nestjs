import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoContentException } from 'src/helpers/exceptions/noContentException';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: number): Promise<Todo[] | undefined> {
    return await this.todoRepository.find({ where: { userId } });
  }

  async findOneById(userId: number, todoId: number): Promise<Todo | undefined> {
    const found = await this.todoRepository.findOne({
      where: { userId, id: todoId },
    });
    if (!found) throw new NotFoundException();
    return found;
  }
  async create(userId: number, dto: CreateTodoDto) {
    return await this.todoRepository.save({ ...dto, userId });
  }
  async update(userId: number, todoId: number, dto: UpdateTodoDto) {
    return await this.todoRepository.update({ id: todoId, userId }, dto);
  }

  async deleteById(userId: number, todoId: number) {
    await this.findOneById(userId, todoId);
    await this.todoRepository.delete({ userId, id: todoId });
    throw new NoContentException();
  }
}
