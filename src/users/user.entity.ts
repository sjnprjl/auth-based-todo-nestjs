import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  admin = 'ADMIN',
  regular = 'REGULAR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ default: false })
  isActive: boolean;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.regular,
  })
  role: Role;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
