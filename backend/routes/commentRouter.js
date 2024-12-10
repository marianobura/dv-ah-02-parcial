const express = require('express');
const router = express.Router();
const { createComment, getComments, getCommentsByPostId, getCommentsByUserId, updateCommentById, deleteCommentById } = require('../controllers/commentController');

router.get('/', getComments );
router.post('/', createComment );
router.get('/:id', getCommentsByPostId);
router.get('/user/:userId', getCommentsByUserId);
router.delete('/:id', deleteCommentById);
router.put('/:id', updateCommentById);

module.exports = router;