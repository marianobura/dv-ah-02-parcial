const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRETKEY;

function validarToken ( req, res, next){
    const auth = req.headers.authorization;
    
    if( !auth ){
        return res.status(401).json({ message: 'Falta el token' });
    }

    token = token.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if( error ){
            return res.status(403).json({ message: 'Token invalido' });
        }

        req.body.userId = decoded.userId;
        next();
    });
}

module.exports= validarToken;