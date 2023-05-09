import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { of } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { UserAuthGuard } from 'src/auth/guard.user';

const storage = {
  storage: diskStorage({
    destination: './uploads/profile',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
};

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly _profileService: ProfileService,
    private readonly _usersService: UserService,
  ) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadfile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const checkUser = await this._profileService.reqUser(req);
    const user = String(checkUser);
    const users = await this._usersService.findOneByName(user);

    if (checkUser) {
      const obj = {
        name: file.filename,
      };
      const pro = await this._profileService.create(obj);
      await this._profileService.profileWithUser(users.id, pro);
      console.log('updated DB Successfully!');
      return file;
    }
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async proPicture(@Req() req, @Res() res) {
    const user = await this._profileService.reqUserPic(req);
    console.log('user DATA:', user);
    return of(res.sendFile(join(process.cwd(), 'uploads/profile/' + user)));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() req,
  ) {
    console.log('Hello Profile Photos Welcome for Uploding!');
    console.log('new uploaded id name:', id);
    console.log('new uploaded file req.body:', req.file);
    // console.log('new uploaded file req.body:', req.body);

    const obj = {
      name: req.file.filename,
    };
    console.log('final dto', obj);

    const fun = await this._profileService.update(+id, obj);
    if (fun) {
      console.log('updated DB Successfully!');
      return file;
    }
  }
}
