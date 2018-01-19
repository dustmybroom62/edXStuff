module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts);
    },
    addPost(req, res) {
        let newPost = req.body;
        let id = req.store.posts.length;
        if (!newPost.comments) {
            newPost.comments = [];
        }
        req.store.posts.push(newPost);
        res.status(201).send({ postId: id });
    },
    updatePost(req, res) {
        var post = req.store.posts[req.params.postId];
        var chg = req.body;
        if (chg.name) {
            post.name = chg.name;
        }
        if (chg.url) {
            post.url = chg.url;
        }
        if (chg.text) {
            post.text = chg.text;
        }
        res.status(200).send(req.store.posts[req.params.postId]);
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1);
        res.status(204).send();
    }
}
