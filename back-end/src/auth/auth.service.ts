import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/passwordEncryption/bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private _jwtService: JwtService,
    private _userService: UserService,
  ) {}
  async userLogin(user: any) {
    if (!user.name || !user.password) {
      throw new UnauthorizedException();
    }
    const userDB = await this._userService.findOneByName(user.name);
    if (userDB) {
      const matched = comparePasswords(user.password, userDB.password);
      if (matched) {
        const payload = { username: userDB.name, sub: userDB.id };
        return {
          access_token: this._jwtService.sign(payload),
        };
      } else {
        throw new NotFoundException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async verifyToken(req: any) {
    const bearer = req.header('authorization');
    console.log('first bearer', bearer);
    bearer.replace('Bearer ', '');
    console.log('2nd bearer', bearer);

    const parts = bearer.split(' ');
    if (parts.length === 2) {
      const token = parts[1];

      try {
        const ver = await this._jwtService.verifyAsync(token, {
          secret: 'SECRET',
        });
        const user = await this._userService.findOne(ver.sub);
        if (user.name == ver.username) {
          return user;
        }
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
          {
            cause: error,
          },
        );
      }
    }
    return false;
  }
}
