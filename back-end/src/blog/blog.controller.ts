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
import { BlogService } from './blog.service';
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

  @Post()
  @UseGuards(UserAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadBlog(@UploadedFile() file: Express.Multer.File, @Req() req) {
    console.log('Hello Gamers');
    console.log('req file', req.file);
    console.log('req body', req.body.body);
    console.log('req title', req.body.title);

    const createBlogDto = {
      title: req.body.title,
      content: req.body.body,
      photo: req.file.filename,
    };

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
  async getupdatedBlogs() {
    const blogs = await this._blogService.updateBlogs();
    return blogs;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._blogService.findOne(id);
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
  // comment Handle
  @UseGuards(UserAuthGuard)
  @Put('comment/:id')
  async commentUpdate(@Param('id') id: string, @Req() req) {
    console.log('id', id);
    console.log('req body', req.body);
    const obj = {
      comment: req.body.Comment,
    };
    console.log('user obj:', obj);
    const user = await this._blogService.verifyToken(req);
    console.log('user:', user);
    return await this._blogService.commentUpdate(+id, req.body, user);
  }
}
