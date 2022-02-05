import { Task } from 'src/tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  name: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}