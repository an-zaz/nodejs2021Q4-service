import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Task from '../tasks/task.model';

/**
 * Represents a user in memory (in kind of User[]) - creates a user with id, login, name, password string properties
 * @param object - with name, login, password string properties
 * @returns object instance (user) with id, login, name, password string properties
 */
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
  @Column()
  name!: string;
  @Column()
  login!: string;
  @Column()
  password!: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[]
}

export default User;
