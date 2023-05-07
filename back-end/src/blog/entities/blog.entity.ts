import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blogs' })
export class Blog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
}
