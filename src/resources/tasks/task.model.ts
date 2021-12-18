import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../interfaces';

class Task {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
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

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  toResponse(): ITask {
    const { id, title, order, description, userId, boardId, columnId } = this;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
