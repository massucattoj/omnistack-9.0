/*
    express -> microframework dentro do node, um conjunto de funcionalidades prontas
                para nao termos que 'recriar a roda'

    GET, POST, PUT, DELETE
        get     -> Buscar informacao do backend. Ex: listagem dos usuarios
        post    -> Utilizar quando se deseja criar uma nova informacao no back end. Ex: cadastro de usuario 
        put     -> editar alguma informacao
        delete  -> deletar informacao

        Obs: rotas do tipo 'POST' nao podem ser executadas pelo navegador, por isso utiliza-se uma outra ferramenta
        para testar todas as rotas, inclusive outros metodos para centralizar em uma unica ferramenta. Porque por 
        padrao o navegador quando vai acessar uma rota ele sempre vai executar o metodo GET.
        
        Ferramenta: Insomnia (Open source, outra opcao -> Postman)


*/
// comecar importando o express em uma variavel
const express = require('express');
    
// criando a aplicacao e setar porta que ela estara escutando
const app = express();

//setar rota e metodo '/ => rota raiz'
app.use(express.json());
app.post('/users', (req, res) => {

    // req -> pega qualquer tipo de parametro que o usuario esta enviando na requisicao
    // res -> devolve uma resposta para a requisicao
    
    // porem como e uma API REST, que vai disponibilizar dados, esses dados nunca sao
    // devolvidos em formato de texto, utiliza-se uma estrutura de dados (JSON)
    //return res.send('Hello world')
    
    // como eh uma estrutura agora mandamos um objeto e nao mais somente texto
    //return res.json({ message: "Hello Massucatto"})

    // req.query -> acessar query params (para filtros)
    // req.params -> acessar route params (para edicao e delete (put))
    // req.body -> acessar corpo da requisicao (para criacao, edicao (post))
    return res.json(req.body);
    
}); 
app.listen(3333);



// yarn add nodemon -D => atualiza automaticamente o servidor quando ocorrerem atualizacoes