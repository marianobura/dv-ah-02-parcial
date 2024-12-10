const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { createComment, getComments, getCommentsByPostId, getCommentsByUserId, updateCommentById, deleteCommentById } = require('../controllers/commentController');

router.get('/', getComments );
router.post('/', auth, createComment );
router.get('/:id', getCommentsByPostId);
router.get('/user/:userId', getCommentsByUserId);
router.delete('/:id', auth, deleteCommentById);
router.put('/:id', auth, updateCommentById);

module.exports = router;