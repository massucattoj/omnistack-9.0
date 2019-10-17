// criar a info no banco de dados
const User = require('../models/User');
const Spot = require('../models/Spot');


module.exports = {

    async index(req, res) {
        const { tech } = req.query;

        // filtrar somente elementos da tech
        // vai procurar no banco spots que possuem a tecnologia capturada pelo metodo get
        const spots = await Spot.find({ techs : tech })
        
        // retorna os spots
        return res.json(spots);
    },

    async store(req, res) {

        // fazer a criacao
        // lembrar de tratar usuario que esta criando o spot
        const { filename } = req.file;
        const { company, techs, price } = req.body;        
        const { user_id } = req.headers;

        // verificar se o usuario existe
        const user = await User.findById(user_id); 
        
        if(!user) {
            return res.status(400).json({ error: 'User does not exist'});
        }

        // criar spot
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()), //transformando em array
            price
        })
        return res.json(spot)
    }
};

// instalar uma nova lib que trata com formatos 'multipart' como upload de imagens
// yarn add multer