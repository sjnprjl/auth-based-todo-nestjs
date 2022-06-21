import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/shared/decorators/role.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Role } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return await this.userService.findWithRelations(req.user.id);
  }
  @Roles(Role.admin)
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
