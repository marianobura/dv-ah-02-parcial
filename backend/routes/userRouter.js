const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUsersById, deleteUserById, updateUserById, login } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, getUsers );
router.post('/', auth, createUser );
router.post('/login', login);
router.get('/:id', auth, getUsersById);
router.delete('/:id', auth, deleteUserById);
router.put('/:id', auth, updateUserById);

module.exports = router;
