const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const secretKey = process.env.SECRETKEY;

const validarToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ msg: 'No hay token' });
    }

    token = auth.split(' ')[1];

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(403).json({ msg: 'Token inválido' });
        }

        req.body.userId = decoded.userId;

        next();
    });
};

module.exports = validarToken;