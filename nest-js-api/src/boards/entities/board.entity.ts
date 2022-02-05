import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IColumn } from '../dto/create-board.dto';
import { Task } from '../../tasks/entities/task.entity';

@Entity('boards')
export class Board {
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
