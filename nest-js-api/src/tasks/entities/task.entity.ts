import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';

@Entity('tasks')
export class Task {
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

