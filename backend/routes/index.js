const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');

function routerAPI( app){
    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/comments', commentRouter);
}

module.exports = routerAPI;