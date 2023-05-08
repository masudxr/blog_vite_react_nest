import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { of } from 'rxjs';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UserAuthGuard } from 'src/auth/guard.user';

const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
};

@Controller('blog')
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    console.log('Hello Gamers');
    const user = await this._blogService.verifyToken(req);
    console.log('verify User:', user);
    return await this._blogService.create(createBlogDto, user);
  }

  @Get()
  findAll() {
    return this._blogService.findAll();
  }

  @UseGuards(UserAuthGuard)
  @Get('myblogs')
  async findOwnBlogs(@Req() req) {
    const user = await this._blogService.verifyToken(req);
    if (user) {
      const blogs = await this._blogService.findOwnBlogs(user);
      return blogs;
    }
  }

  @Get('updateBlogs')
  async updateBlogs() {
    const blogs = await this._blogService.updateBlogs();
    return blogs;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._blogService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return await this._blogService.update(+id, updateBlogDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._blogService.remove(+id);
  }
}
