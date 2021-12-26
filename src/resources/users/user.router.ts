import Router from 'koa-router';
import usersService from './user.service';

const router = new Router({
  prefix: '/users',
});

router.get('/', async (ctx, next) => {
  const users = await usersService.getAll();
  ctx.body = users.map((user) => user.toResponse());
  ctx.status = 200;
  await next();
});

router.get('/:userId', async (ctx, next) => {
  const user = await usersService.getByID(ctx.params.userId);
  if (!user) {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
    return;
  }
  ctx.status = 200;
  ctx.body = user;
  await next();
});

router.post('/', async (ctx, next) => {
  if (!ctx.request.body.name) {
    ctx.status = 400;
    ctx.body = { message: 'Name field was not found' };
    return;
  }
  const createdUser = await usersService.create(
    ctx.request.body.name,
    ctx.request.body.login,
    ctx.request.body.password
  );
  ctx.body = createdUser.toResponse();
  ctx.status = 201;
  await next();
});

router.put('/:userId', async (ctx, next) => {
  if (!ctx.request.body.name) {
    ctx.status = 400;
    ctx.body = { message: 'Name field was not found' };
    return;
  }
  const updatedUser = await usersService.updateById(
    ctx.params.userId,
    ctx.request.body.name,
    ctx.request.body.login,
    ctx.request.body.password
  );
  if (!updatedUser) {
    ctx.status = 404;
    ctx.body = { message: 'User was not found' };
    return;
  }
  ctx.body = updatedUser.toResponse();
  ctx.status = 200;
  await next();
});

router.delete('/:userId', async (ctx, next) => {
  if (!ctx.params.userId) {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
    return;
  }
  await usersService.deleteById(ctx.params.userId);
  ctx.status = 204;
  await next();
});

export default router;
