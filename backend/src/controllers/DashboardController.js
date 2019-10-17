const Spot = require('../models/Spot');

module.exports = {
    async show(req, res) {

        // procurar ID do usuario logado
        const { user_id } = req.headers;

        // retorna o id certo
        //return(console.log(user_id))
        // spots de um determinado usuario
        
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}