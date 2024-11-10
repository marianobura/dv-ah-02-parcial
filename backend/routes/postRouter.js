const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostsByUserId, updatePostById, deletePostById, getPostById, getPostsByName } = require('../controllers/postController');

router.get('/', getPosts );
router.post('/', createPost );
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUserId);
router.delete('/:id', deletePostById);
router.put('/:id', updatePostById);
router.get('/name/:title', getPostsByName);

module.exports = router;
