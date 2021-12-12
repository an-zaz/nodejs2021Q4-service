const Koa = require('koa');
const koaBody = require('koa-body');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(koaBody());

app.use(userRouter.routes());
app.use(boardRouter.routes());
app.use(taskRouter.routes());

module.exports = app;
