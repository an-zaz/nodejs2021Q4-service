const Router = require('koa-router');
const usersService = require('./user.service');

const router = new Router({
    prefix: '/users'
});

router.get('/',  async(ctx, next) => {
    const users = await usersService.getAll();
    ctx.body = users.map((user) => user.toResponse());
    ctx.status = 200;
    // ctx.body.json(users.length ? users.map((user)=> user.toResponse()) : users);
    next();
});

router.get('/:id', async(ctx, next) => {
    const user = await usersService.getByID(ctx.params.id);
    // if (!uuid.validate(ctx.params.id)){
    //     ctx.status = 401;
    //     ctx.body = 'Access token is missing or invalid';
    //     return;
    // }
    if (!user){
        ctx.status = 404;
        ctx.body = { message: 'User not found' };
        return;
    }
    ctx.status = 200;
    ctx.body = user;
    next();
});

router.post('/', async (ctx, next) => {
    if (
        !ctx.request.body.name
    ) {
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
    next();
});

router.put('/:id', async (ctx, next) => {
    // if ( !ctx.request.body.id || !uuid.validate(ctx.params.id)) {
    //     ctx.status = 400;
    //     ctx.body = '';
    //     return;
    // }
    if (
        !ctx.request.body.name
    ) {
        ctx.status = 400;
        ctx.body = { message: 'Name field was not found' };
        return;
    }
    const updatedUser = await usersService.updateById(
        ctx.params.id,
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
    next();
});

router.delete('/:id', async (ctx, next) => {
    // if (  !uuid.validate(ctx.params.id)) {
    //     ctx.status = 400;
    //     ctx.body = ';
    //     return;
    // }
    await usersService.deleteById(ctx.request.body.id);
    ctx.status = 204;
    next();
});

module.exports = router;
