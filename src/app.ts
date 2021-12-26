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
import process from 'process';
import { logger } from './common/logger';
import { Exception } from './common/exception';

const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(async (ctx, next) => {
  const { url, method, querystring, body } = ctx.request;
  try {
    await next();
  } catch (err) {
    const error = err as Exception;
    logger.error('Caught Error during execution:', { message: error.message });
    ctx.status = error.statusCode || 500;
    ctx.body = {
      message: error.message,
    };
    logger.info(
      `METHOD: ${method}
       URL: ${url}
       QUERY: ${querystring || 'no query'}
       BODY REQUEST: ${JSON.stringify(body)}
       STATUS: ${ctx.status}
       BODY RESPONSE: ${JSON.stringify(ctx.body)} `
    );
  }
});

app.use(async (ctx, next) => {
  const { url, method, querystring, body } = ctx.request;
  const bodyReQ = body;
  await next();
  finished(ctx.res, () => {
    const { status, body } = ctx.response;
    logger.info(
      `METHOD: ${method} URL: ${url} QUERY: ${querystring || 'no query'}
       BODY REQUEST: ${JSON.stringify(bodyReQ)} STATUS: ${status} 
       BODY RESPONSE: ${JSON.stringify(body)} `
    );
  });
});

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.get(
  '/doc',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec: swaggerDocument } })
);

app.use(userRouter.routes());
app.use(boardRouter.routes());
app.use(taskRouter.routes());
app.use(router.routes());

process.on('uncaughtException', (err, origin) => {
  logger.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
