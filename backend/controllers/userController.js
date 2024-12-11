const User = require('../models/usersModels');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRETKEY;
const salt = 10;

const createUser = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400).json({ msg: 'Faltan paramátros obligatorios', data: { username, password, email } })
    }

    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const newUser = new User({ username, password: passwordHash, email })
        await newUser.save();
        res.status(200).json({ msg: 'Usuario creado', data: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'El email no existe' });
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const data = { userId: user._id, username: user.username, email: user.email };

        const token = jwt.sign(data, secretKey, { expiresIn: '1h' });

        res.status(200).json({ msg: 'Inicio de sesión exitoso', data: { jwt: token, user: data }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ msg: 'Usuarios obtenidos', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
    }
};

const getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(200).json({ msg: 'Usuario obtenido', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el usuario', error: error.message });
    }
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const user = await User.findByIdAndUpdate(id, { username, password: passwordHash, email }, { new: true });
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

module.exports = { createUser, getUsers, getUsersById, deleteUserById, updateUserById, login };