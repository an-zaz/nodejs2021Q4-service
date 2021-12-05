const Koa = require('koa');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

const app = new Koa();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(async ctx => {
  ctx.body = 'App is running';
});

// app.use('/users', userRouter);

module.exports = app;
