import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    JwtModule,
    UserModule,
    BlogModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [TypeOrmModule, CommentService],
})
export class CommentModule {}
