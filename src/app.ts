import Koa from 'koa';
import koaBody from 'koa-body';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import Router from 'koa-router';
import { finished } from 'stream';

const app = new Koa();
const router = new Router();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.get(
  '/doc',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec: swaggerDocument } })
);

app.use(koaBody());

app.use(async (ctx, next) => {
  const { url, method, querystring, body } = ctx.request;
  const bodyReQ = body;
  await next();
  finished(ctx.res, () => {
    const { status, body } = ctx.response;
    console.log(
      `METHOD: ${method}
       URL: ${url}
       QUERY: ${querystring || 'no query'}
       BODY REQUEST: ${JSON.stringify(bodyReQ)}
       STATUS: ${status}
       BODY RESPONSE: ${JSON.stringify(body)} `
    );
  });
});

app.use(userRouter.routes());
app.use(boardRouter.routes());
app.use(taskRouter.routes());
app.use(router.routes());

export default app;


