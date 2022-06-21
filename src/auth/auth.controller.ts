import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthLoginDto, AuthRegistrationDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/public.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { Role } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @Public()
  async login(
    @Body() loginDto: AuthLoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() body: AuthRegistrationDto) {
    return this.authService.register(body);
  }

  @Roles(Role.admin)
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authService.delete(id);
  }
}
