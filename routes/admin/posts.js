const express = require('express');
const Post    = require('../../models/Post');
const router = express.Router();

router.all('/*', (req, res, next) =>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    Post.find({}).then(posts =>{
        res.render('admin/posts', {posts: posts});
    });
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

// ADDING FIELDS INTO DATABASE //
router.post('/create', (req, res)=>{
    let allowComments = true;
    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }
    const newPost = new Post({
        title: req.body.title,
        status:req.body.status,
        allowComments: allowComments,
        body: req.body.body
    });

    newPost.save().then(savedPost => {
        console.log(savedPost);
        res.redirect('/admin/posts');
    }).catch(error =>{
        console.log('Could not save post');
    });
});

// EDITING POSTS //
router.get('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(posts=>{
        res.render('admin/posts/edit', {posts: posts})
    });
});

router.put('/edit/:id', (req, res) =>{
    Post.findOne({_id: req.params.id}).then(posts=>{
        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }
        posts.title = req.body.title;
        posts.status = req.body.status;
        posts.allowComments = allowComments;
        posts.body = req.body.body;
        posts.save().then(updatedPost=>{
            res.redirect('/admin/posts');
        });
    });
});

// DELETING POSTS //
router.delete('/:id', (req, res)=> {
    Post.remove({_id: req.params.id}).then(result=>{
        res.redirect('/admin/posts');
    });
});

module.exports = router;