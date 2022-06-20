import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRegistrationDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(where: {
    username?: string;
    id?: number;
    email?: string;
  }): Promise<User | undefined> {
    return await this.userRepository.findOne({ where });
  }

  async findWithRelations(userId: number) {
    const got = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['todos'],
    });
    delete got.password;
    return got;
  }
  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }
  async create(user: AuthRegistrationDto) {
    await this.userRepository.save(user);
  }
  async deleteById(userId: number) {
    await this.userRepository.delete(userId);
  }
  async updateById(userId: number, updateUser: Partial<User>) {
    try {
      await this.userRepository.findOneOrFail({ where: { id: userId } });
      const updatedUser = await this.userRepository.save(updateUser);
      delete updatedUser.password;
      return updatedUser;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
