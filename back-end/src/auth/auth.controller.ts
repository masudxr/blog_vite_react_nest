import {
  Controller,
  Body,
  Post,
  UnauthorizedException,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserAuthGuard } from './guard.user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private _jwtService: JwtService,
    private readonly _usersService: UserService,
  ) {}

  @Post('login')
  async userLogin(@Body() req) {
    console.log('req from frontend', req);
    const token = await this._authService.userLogin(req);
    console.log('user token:', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    return {
      token: token,
    };
  }
  @UseGuards(UserAuthGuard)
  @Get('profile')
  async getUser(@Req() req) {
    console.log('request', req.headers.authorization);
    const user = await this._authService.verifyToken(req);
    console.log('user:', user);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
