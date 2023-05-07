import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: number;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
