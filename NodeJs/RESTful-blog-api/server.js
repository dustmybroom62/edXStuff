const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const routes = require('./routes');

let store = {};
store.posts = [];

let app = express();
app.use(bodyParser.json({ strict: false }));
app.use(logger('dev'));
app.use(errorhandler());
app.use((req, res, next) => {
    req.store = store;
    next();
})

app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPost);
app.put('/posts/:postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.removePost);

app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts/:postId/comments', routes.comments.addComment);
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment);

app.listen(3000);