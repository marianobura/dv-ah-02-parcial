const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostsByUserId, updatePostById, deletePostById, getPostById, getPostsByName } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.get('/', auth, getPosts );
router.post('/', auth, createPost );
router.get('/:id', auth, getPostById);
router.get('/user/:userId', auth, getPostsByUserId);
router.delete('/:id', auth, deletePostById);
router.put('/:id', auth, updatePostById);
router.get('/name/:title', auth, getPostsByName);

module.exports = router;
