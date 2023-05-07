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
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UserAuthGuard } from 'src/auth/guard.user';

@Controller('blog')
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req) {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._blogService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this._blogService.update(+id, updateBlogDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._blogService.remove(+id);
  }
}
