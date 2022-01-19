import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../users/user.model';
import Board from '../boards/board.model';

/**
 * Represents a task in memory (in kind of Task[]) - creates a task with generated id
 * @param object - with title, order, description, userId, boardId, columnId string properties
 * @returns object instance (task) with id, title, order, description, boardId, columnId string and userId string or null properties
 */
@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
  @Column()
  title!: string;
  @Column()
  order!: number;
  @Column()
  description!: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId!: string | null;
  @Column()
  boardId!: string;
  @Column({ nullable: true })
  columnId!: string;
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board!: Board;
}

export default Task;
