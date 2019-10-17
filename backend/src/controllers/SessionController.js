/*
    Regra de negocio

    Dentro do controller temos os seguintes metodos
    -> index (metodo que retorna uma listagem de sessoes)
    -> show (listar uma unica sessao)
    -> store (criar uma sessao)
    -> update (alterar sessao)
    -> destroy (deletar sessao)
*/

// criar um usuario
const User = require('../models/User');

// exportar um objeto
// dentro do objeto coloca-se todos os metodos para cada uma das rotas
module.exports = {

    // criar sessao
    async store(req, res) {
        //const email = req.body.email;
        const { email } = req.body;

        // usar await para esperar a funcao executar
        // toda vez que usar await a funcao deve ser 'async'
        // so executa a proxima linha apos essa com o await finalizar a operacao
        //const user = await User.create({ email }) 
        
        // verificar se email ja esta cadastrado
        let user = await User.findOne({ email });

        // se nao encontrar o usuario
        if (!user) {
            user = await User.create({ email });
        }
                
        return res.json(user);        
    }
};