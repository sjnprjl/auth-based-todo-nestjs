import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginDto, AuthRegistrationDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/public.decorator';

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
}
