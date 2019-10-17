/*
    Model sempre com letra maiuscula e no singular!!!
    Coloca-se a informacao que o modelo vai ter, quais campos devem ser gravados no 
    Banco de Dados
*/
const mongoose = require('mongoose');

// estrutura do usuario, quais campos, quais os tipos de campos
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],

    // salvar qual o usuario que criou o spot -> apenas referencia para o usuario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // a qual model esta se referindo
    }
}, {
    toJSON: {
        virtuals: true,
        // toda vez que um spot for convertido em JSON, quero que calcule os virtuals automaticamentte
    },
});

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.103:3333/files/${this.thumbnail}`
});

// criando de fato o modelo
module.exports = mongoose.model('Spot', SpotSchema);


