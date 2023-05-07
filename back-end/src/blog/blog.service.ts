import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private _blogRepository: Repository<Blog>,
    private _jwtService: JwtService,
    private _userService: UserService,
  ) {}

  async create(blogDetails: CreateBlogDto, user: any) {
    const blog = this._blogRepository.create({
      ...blogDetails,
    });
    blog.user = user;
    const newBlog = await this._blogRepository.save(blog);
    return newBlog;
  }

  async findAll() {
    const blog = await this._blogRepository.find({
      relations: ['user'],
    });
    return blog;
  }
  async findOwnBlogs(user: any) {
    const blog = await this._blogRepository.find({
      relations: ['user'],
    });
    const arr = [];
    for (let i = 0; i < blog.length; i++) {
      if (blog[i].user.name == user.name) {
        arr.push(blog[i]);
      }
    }
    return arr;
  }

  async findOne(id: number) {
    const blog = await this._blogRepository.findOne({
      where: {
        id: id,
      },
    });
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const user = await this._blogRepository.update(
      { id },
      { ...updateBlogDto },
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'Not Updated Please Try agaiin !! ',
      HttpStatus.FORBIDDEN,
    );
  }

  async remove(id: number) {
    await this._blogRepository.delete({ id });
  }

  async verifyToken(req: any) {
    const bearer = req.header('authorization');
    bearer.replace('Bearer ', '');

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
