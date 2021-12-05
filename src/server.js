const { PORT } = require('./common/config');
const app = require('./app');

const _PORT = PORT || 4000;

app.listen(PORT,'localhost', (e) => {
if (e){
    console.log(e)
} else {
    console.log(`Server is listening on port ${_PORT}`)
}
});
