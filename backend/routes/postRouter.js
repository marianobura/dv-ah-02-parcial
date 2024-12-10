const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { createPost, getPosts, getPostsByUserId, updatePostById, deletePostById, getPostById, getPostsByName } = require('../controllers/postController');

router.get('/', getPosts );
router.post('/', auth, createPost );
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUserId);
router.delete('/:id', auth, deletePostById);
router.put('/:id', auth, updatePostById);
router.get('/name/:title', getPostsByName);

module.exports = router;
