import Koa from 'koa';
import koaBody from 'koa-body';
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = new Koa();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(koaBody());

app.use(userRouter.routes());
app.use(boardRouter.routes());
app.use(taskRouter.routes());

export default app;
