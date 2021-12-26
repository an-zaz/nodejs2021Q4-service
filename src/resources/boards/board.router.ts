import Router from 'koa-router';
import boardsService from './board.service';

const router = new Router({
  prefix: '/boards',
});

router.get('/', async (ctx, next) => {
  ctx.body = await boardsService.getAll();
  ctx.status = 200;
  await next();
});

router.get('/:boardId', async (ctx, next) => {
  const board = await boardsService.getByID(ctx.params.boardId);
  if (!board) {
    ctx.status = 404;
    ctx.body = { message: 'Board not found' };
    return;
  }
  ctx.status = 200;
  ctx.body = board;
  await next();
});

router.post('/', async (ctx, next) => {
  if (!ctx.request.body.title || !ctx.request.body.columns) {
    ctx.status = 400;
    ctx.body = { message: 'Title or/and column field(s) was/were not found' };
    return;
  }
  ctx.body = await boardsService.create(
    ctx.request.body.title,
    ctx.request.body.columns
  );
  ctx.status = 201;
  await next();
});

router.put('/:boardId', async (ctx, next) => {
  if (!ctx.request.body.title || !ctx.request.body.columns) {
    ctx.status = 400;
    ctx.body = { message: 'Title or/and column field(s) was/were not found' };
    return;
  }
  const updatedBoard = await boardsService.updateById(
    ctx.params.boardId,
    ctx.request.body.title,
    ctx.request.body.columns
  );
  if (!updatedBoard) {
    ctx.status = 404;
    ctx.body = { message: 'Board was not found' };
    return;
  }
  ctx.body = updatedBoard;
  ctx.status = 200;
  await next();
});

router.delete('/:boardId', async (ctx, next) => {
  if (!ctx.params.boardId) {
    ctx.status = 404;
    ctx.body = { message: 'Board not found' };
    return;
  }
  await boardsService.deleteById(ctx.params.boardId);
  ctx.status = 204;
  await next();
});

export default router;
