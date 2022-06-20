import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthLoginDto, AuthRegistrationDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body() body: AuthRegistrationDto) {
    return this.authService.register(body);
  }
}
