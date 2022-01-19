import { ITask } from '../../interfaces';

/**
 * Returns a task (Task instance)
 * @returns task - task object (ITask)
 */
export const toResponse = (task: ITask): ITask => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};
