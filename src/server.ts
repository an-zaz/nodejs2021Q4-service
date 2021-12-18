import config from './common/config';
import app from './app';

const _PORT = config.PORT || 4000;

app.listen(_PORT, () => {
  console.log(`Server is listening on port ${_PORT}`);
});
