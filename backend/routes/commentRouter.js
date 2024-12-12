const express = require('express');
const router = express.Router();
const { createComment, getComments, getCommentsByPostId, getCommentsByUserId, updateCommentById, deleteCommentById } = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.get('/', auth, getComments );
router.post('/', auth, createComment );
router.get('/:id', auth, getCommentsByPostId);
router.get('/user/:userId', auth, getCommentsByUserId);
router.delete('/:id', auth, deleteCommentById);
router.put('/:id', auth, updateCommentById);

module.exports = router;