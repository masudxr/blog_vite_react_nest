import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private _commentRepository: Repository<Comment>,
    @InjectRepository(Blog) private _blogRepository: Repository<Blog>,

    private _jwtService: JwtService,
    private _userService: UserService,
  ) {}

  async create(id, commentDetails: CreateCommentDto, user: any) {
    // console.log('comment details', commentDetails);
    // console.log('user details', user);
    // console.log('blog id', id);

    const newComment = this._commentRepository.create({
      ...commentDetails,
    });

    const comm = await this._commentRepository.save(newComment);
    // console.log('new comment:', comm);
    // console.log(comm.id);
    const com = await this._commentRepository.findOne({
      relations: ['users', 'blog'],
      where: {
        id: comm.id,
      },
    });
    // console.log('com', com);
    const blog = await this._blogRepository.findOne({
      where: {
        id: id,
      },
    });

    // console.log('blog', blog);
    com.users = user;
    com.blog = blog;
    // console.log('final Comment', com);
    const commt = await this._commentRepository.save(com);
    return commt;
  }

  findAll() {
    return `This action returns all comment`;
  }

  // async findOne(id: number) {
  //   const com = await this._commentRepository.findOne({
  //     relations: {
  //       user: true,
  //     },
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this._commentRepository.update(
      { id },
      { ...updateCommentDto },
    );
    console.log('comment', comment);
  }

  async remove(id: number) {
    await this._commentRepository.delete({ id });
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
