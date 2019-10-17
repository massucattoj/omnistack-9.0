const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,

    // salvar qual o usuario que criou o spot -> apenas referencia para o usuario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

// criando de fato o modelo
module.exports = mongoose.model('Booking', BookingSchema);