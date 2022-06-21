import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegistrationDto } from './dto/auth.dto';
import { User } from 'src/users/user.entity';
import { queryFailedGuard } from 'src/helpers/query-failed-guard';
import {
  PG_NOT_NULL_VIOLATION,
  PG_UNIQUE_VIOLATION,
} from 'src/helpers/postgres-error-codes';
import * as argon from 'argon2';
import { NoContentException } from 'src/helpers/exceptions/noContentException';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findOne({ username });
    try {
      if (user && (await argon.verify(user.password, password))) {
        const result = { ...user };
        return result;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
    return null;
  }
  async login(user: AuthLoginDto) {
    const gotUser = await this.validateUser(user.username, user.password);
    if (!gotUser) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User credential is incorrect',
      });
    }
    const payload = {
      sub: gotUser.id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
  async register(dto: AuthRegistrationDto) {
    console.log(dto);
    try {
      await this.userService.create({
        ...dto,
        password: await argon.hash(dto.password),
      });
    } catch (err) {
      if (queryFailedGuard(err)) {
        switch (err.code) {
          case PG_NOT_NULL_VIOLATION:
            throw new BadRequestException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'All fields are required.',
            });
            break;
          case PG_UNIQUE_VIOLATION:
            throw new ConflictException({
              statusCode: HttpStatus.CONFLICT,
              message: 'User already exists.',
            });
            break;
        }
      }
    }
  }

  async delete(id: number) {
    const user = await this.userService.findOne({ id });
    if (!user) throw new NotFoundException();
    await this.userService.deleteById(id);
    throw new NoContentException('Deleted');
  }
}
