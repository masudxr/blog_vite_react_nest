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
      relations: ['user', 'comments'],
    });
    const arr = [];
    for (let i = 0; i < blog.length; i++) {
      if (blog[i].user.name == user.name) {
        arr.push(blog[i]);
      }
    }
    console.log('array', arr);
    return arr;
  }

  async updateBlogs() {
    const blog = await this._blogRepository.find({
      relations: ['user', 'comments'],
    });
    const arr = [];
    const len = blog.length - 1;
    for (let i = len; i >= 0; i--) {
      if (blog.length < 10) {
        arr.push(blog[i]);
      }
    }
    return arr;
  }
  async findOne(id: string) {
    const blog = await this._blogRepository.find({
      relations: ['user'],
    });

    console.log('blog', blog);
    console.log('blog user name', id);
    const Array = [];
    for (let i = 0; i < blog.length; i++) {
      if (id == blog[i].user.name) {
        Array.push(blog[i]);
      }
    }

    return Array;
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
  async commentUpdate(id: number, comment: UpdateBlogDto, user: any) {
    console.log('service id', id);
    console.log('service comment', comment);
    console.log('service user', user);

    const blog = await this._blogRepository.findOne({
      relations: ['user'],
      where: {
        id: id,
      },
    });

    console.log('curent blog', blog);

    // const user = await this._blogRepository.update({ id }, { ...comment });
    // if (user) {
    //   return user;
    // }
    // throw new HttpException(
    //   'Not Updated Please Try agaiin !! ',
    //   HttpStatus.FORBIDDEN,
    // );
  }
}
