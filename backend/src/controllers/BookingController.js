const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // trazer as infos ao inves de so os IDs
        await booking.populate('spot').populate('user').execPopulate();

        // verificar se o dono so spot tem uma conexao em tempo real com a aplicacao
        const ownerSocket = req.connectedUsers[booking.spot.user]

        // se existir conexao envia a mensagem
        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};