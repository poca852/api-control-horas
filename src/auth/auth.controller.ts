import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { Auth, GetUser } from './decorators';
import { Employe } from 'src/employees/entities/employees.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDto: LoginDto 
  ) {
    return this.authService.login( loginDto );
  }

  @Auth()
  @Get("revalidar")
  async checkStatus(
    @GetUser() user: Employe
  ) {
    return this.authService.checkStatus(user)
  }

}
