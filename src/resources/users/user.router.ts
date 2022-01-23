import Router from 'koa-router';
import usersService from './user.service';
import { Exception } from '../../common/exception';
import { toResponse } from './user.utils';
import checkToken from "../../common/checkToken";

const router = new Router({
  prefix: '/users',
});

router.get('/', async (ctx, next) => {
  const users = await usersService.getAll();
  ctx.body = users.map((user) => toResponse(user));
  ctx.status = 200;
  await next();
});

router.get('/:userId', async (ctx, next) => {
  const user = await usersService.getByID(ctx.params.userId);
  if (!user) {
    throw new Exception('User was not found', 404);
  }
  ctx.status = 200;
  ctx.body = user;
  await next();
});

router.post('/', async (ctx, next) => {
  if (!ctx.request.body.name) {
    throw new Exception('Name field was not found', 400);
  }
  const createdUser = await usersService.create(
    ctx.request.body.name,
    ctx.request.body.login,
    ctx.request.body.password
  );
  ctx.body = toResponse(createdUser);
  ctx.status = 201;
  await next();
});

router.put('/:userId', async (ctx, next) => {
  if (!ctx.request.body.name) {
    throw new Exception('Name field was not found', 400);
  }
  const updatedUser = await usersService.updateById(
    ctx.params.userId,
    ctx.request.body.name,
    ctx.request.body.login,
    ctx.request.body.password
  );
  if (!updatedUser) {
    throw new Exception('User was not found', 404);
  }
  ctx.body = toResponse(updatedUser);
  ctx.status = 200;
  await next();
});

router.delete('/:userId', async (ctx, next) => {
  if (!ctx.params.userId) {
    throw new Exception('User was not found', 404);
  }
  await usersService.deleteById(ctx.params.userId);
  ctx.status = 204;
  await next();
});

export default router;
