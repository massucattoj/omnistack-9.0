/*
    Model sempre com letra maiuscula e no singular!!!
    Coloca-se a informacao que o modelo vai ter, quais campos devem ser gravados no 
    Banco de Dados
*/
const mongoose = require('mongoose');

// estrutura do usuario, quais campos, quais os tipos de campos
const UserSchema = new mongoose.Schema({
    //name : String,
    //age : Number,
    email : String,

});

// criando de fato o modelo
module.exports = mongoose.model('User', UserSchema);