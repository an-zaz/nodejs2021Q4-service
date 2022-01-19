import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IColumn } from '../../interfaces';
import Task from '../tasks/task.model';

/**
 * Represents a board in memory (in kind of Board[]) - creates a board with generated id
 * @param object - with title string and columns string[] properties
 * @returns object instance (board) with id, title string and columns string[] properties
 */
@Entity('boards')
class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
  @Column()
  title!: string;
  @Column({
    type: 'jsonb',
    array: false,
    nullable: false,
  })
  columns!: Array<IColumn>;
  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}

export default Board;
