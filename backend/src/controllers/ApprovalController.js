const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        // verificar se o dono so spot tem uma conexao em tempo real com a aplicacao
        const bookingUserSocket = req.connectedUsers[booking.user]

        // se existir conexao envia a mensagem
        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }


        return res.json(booking);
    }
};