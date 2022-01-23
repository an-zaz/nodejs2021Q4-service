import Router from 'koa-router';
import tasksService from './task.service';
import { Exception } from '../../common/exception';
import { toResponse } from './tasks.utils';
import checkToken from "../../middlewares/checkToken";

const router = new Router({
  prefix: '/boards/:boardId/tasks',
});

router.get('/', async (ctx, next) => {
  const tasks = await tasksService.getAll();
  ctx.body = tasks.map((task) => toResponse(task));
  ctx.status = 200;
  await next();
});

router.get('/:taskId', async (ctx, next) => {
  const task = await tasksService.getByIDAndBoardID(
    ctx.params.taskId,
    ctx.params.boardId
  );
  if (!task) {
    throw new Exception('Task not found', 404);
  }
  ctx.status = 200;
  ctx.body = task;
  await next();
});

router.post('/', async (ctx, next) => {
  if (
    !ctx.request.body.title ||
    ctx.request.body.order === undefined ||
    !ctx.params.boardId
  ) {
    throw new Exception(
      'Title or/and columnId, order field(s) was/were not found',
      400
    );
  }
  const createdTask = await tasksService.create(
    ctx.request.body.title,
    ctx.request.body.order,
    ctx.request.body.description,
    ctx.request.body.userId,
    ctx.params.boardId,
    ctx.request.body.columnId
  );
  ctx.body = toResponse(createdTask);
  ctx.status = 201;
  await next();
});

router.put('/:taskId', async (ctx, next) => {
  if (
    !ctx.params.taskId ||
    !ctx.params.boardId ||
    ctx.request.body.order === undefined
  ) {
    throw new Exception('TaskId or/and BoardId, order was/were not found', 400);
  }
  const updatedTask = await tasksService.updateById(
    ctx.params.taskId,
    ctx.request.body.title,
    ctx.request.body.order,
    ctx.request.body.description,
    ctx.request.body.userId,
    ctx.params.boardId,
    ctx.request.body.columnId
  );
  if (!updatedTask) {
    throw new Exception('Task was not found', 400);
  }
  ctx.body = toResponse(updatedTask);
  ctx.status = 200;
  await next();
});

router.delete('/:taskId', async (ctx, next) => {
  if (!ctx.params.taskId || !ctx.params.boardId) {
    throw new Exception('Task was not found', 404);
  }
  await tasksService.deleteById(ctx.params.taskId, ctx.params.boardId);
  ctx.status = 204;
  await next();
});

export default router;
