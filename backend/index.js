const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/usersModels');
const routerAPI = require('./routes');
const cors = require('cors');
require('dotenv').config();


// accedemos a la variable de Entorno
const port = process.env.PORT;

// Conectamos a la db
mongoose.connect(process.env.URI_BD, { })
const db = mongoose.connection;

db.on('error', () => console.error('Error'));
db.once('open', () => {
    console.log('Conexión correcta');
})

const app = express();
// Ruta Raíz
app.use(cors());
app.use(express.json());

//Definimos la carpeta para servir archivos estaticos
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Soy el middleware');
    next();
})

app.get('/', (req, res) => {
    res.status(200).send('<h1> API REST </h1>');
})

// Llamamos a las rutas
routerAPI(app);

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
});