// importo Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creo el Esquema
const userSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);
// Exporto el model
module.exports = User;

// {
//     "username": "",
//     "password": ""
// }