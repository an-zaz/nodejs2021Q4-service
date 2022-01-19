import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  order!: string;
  @Column()
  description!: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId!: string | null;
  @Column()
  boardId!: string;
  @Column()
  columnId!: string;
}

export default Task;
