import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), JwtModule, UserModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [TypeOrmModule, BlogService],
})
export class BlogModule {}
