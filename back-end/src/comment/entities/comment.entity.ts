import { Blog } from 'src/blog/entities/blog.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  comment: string;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinTable()
  users: User[];

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;
}
