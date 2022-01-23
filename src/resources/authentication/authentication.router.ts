import Router from 'koa-router';
import  authService from './authentication.service';
import { Exception } from '../../common/exception';

const router = new Router({
    prefix: '/login',
});

router.post('/', async (ctx, next) => {
    const { login, password } = ctx.request.body;
    const token = await authService.login(login, password);
    if (!token) {
        throw new Exception('Forbidden', 403);
    }
    ctx.body = { token };
    ctx.status = 200;
    await next();
});

export default router;
