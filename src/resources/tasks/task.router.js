const Router = require('koa-router');
const tasksService = require('./task.service');

const router = new Router({
    prefix: '/boards/:boardId/tasks'
});

router.get('/',  async(ctx, next) => {
    const tasks = await tasksService.getAll();
    ctx.body = tasks.map((task) => task.toResponse());
    ctx.status = 200;
    next();
});

router.get('/:taskId', async(ctx, next) => {
    const task = await tasksService.getByIDAndBoardID(ctx.params.taskId, ctx.params.boardId);
    if (!task){
        ctx.status = 404;
        ctx.body = { message: 'Task not found' };
        return;
    }
    ctx.status = 200;
    ctx.body = task;
    next();
});

router.post('/', async (ctx, next) => {
    if (
        !ctx.request.body.title ||
        ctx.request.body.order === undefined ||
        !ctx.params.boardId
    ) {
        ctx.status = 400;
        ctx.body = { message: 'Title or/and columnId, order field(s) was/were not found' };
        return;
    }
    const createdTask = await tasksService.create(
        ctx.request.body.title,
        ctx.request.body.order,
        ctx.request.body.description,
        ctx.request.body.userId,
        ctx.params.boardId,
        ctx.request.body.columnId,
    );
    ctx.body = createdTask.toResponse();
    ctx.status = 201;
    next();
});

router.put('/:taskId', async (ctx, next) => {
    if (
        !ctx.params.taskId ||
        !ctx.params.boardId ||
        ctx.request.body.order === undefined
    ) {
        ctx.status = 400;
        ctx.body = { message: 'TaskId or/and BoardId, order was/were not found' };
        return;
    }
    const updatedTask = await tasksService.updateById(
        ctx.params.taskId,
        ctx.request.body.title,
        ctx.request.body.order,
        ctx.request.body.description,
        ctx.request.body.userId,
        ctx.params.boardId,
        ctx.request.body.columnId,
    );
    if (!updatedTask) {
        ctx.status = 404;
        ctx.body = { message: 'Task was not found' };
        return;
    }
    ctx.body = updatedTask.toResponse();
    ctx.status = 200;
    next();
});

router.delete('/:taskId', async (ctx, next) => {
    if (
        !ctx.params.taskId ||
        !ctx.params.boardId
    ) {
        ctx.status = 404;
        ctx.body = { message: 'Task not found' };
        return;
    }
    await tasksService.deleteById(ctx.params.taskId, ctx.params.boardId);
    ctx.status = 204;
    next();
});

module.exports = router;
