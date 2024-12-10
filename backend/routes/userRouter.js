const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { createUser, getUsers, getUsersById, deleteUserById, updateUserById, login } = require('../controllers/userController');

// Retorna todos los usuarios
router.get('/', getUsers );
// Crea un usuario
router.post('/', createUser );
// Login
router.post('/login', login);
// Obtener usuario por ID
router.get('/:id', getUsersById);
// Eliminamos un user por id
router.delete('/:id', auth, deleteUserById);
// Actualizamos el usuarios
router.put('/:id', auth, updateUserById);

module.exports = router;
