import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a task in memory (in kind of Task[]) - creates a task with generated id
 * @param object - with title, order, description, userId, boardId, columnId string properties
 * @returns object instance (task) with id, title, order, description, boardId, columnId string and userId string or null properties
 */
@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  title: string;
  @Column()
  order: string;
  @Column()
  description: string;
  @Column()
  userId: string | null;
  @Column()
  boardId: string;
  @Column()
  columnId: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: Omit<ITask, 'id'>) {
    this.id = uuidv4();
    this.order = order;
    this.title = title;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
  }
  /**
   * Sets userId property to task
   * @param userId - user's id property in Task instance (string | null)
   */
  setUserId(userId: string | null) {
    this.userId = userId;
  }
  /**
   * Returns a task (Task instance)
   * @returns task - task object (ITask)
   */
  toResponse(): ITask {
    const { id, title, order, description, userId, boardId, columnId } = this;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
