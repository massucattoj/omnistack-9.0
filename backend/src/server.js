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
// comecar importando o express e as rotas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// servidor ouvir tanto requisicoes http como web sockets
const socketio = require('socket.io');
const http = require('http');


const routes = require('./routes');    


// criando a aplicacao e setar porta que ela estara escutando
const app = express();
const server = http.Server(app);
const io = socketio(server);


// configurando conexao com mongodb
mongoose.connect('mongodb+srv://massuca:omnistack@omnistack9-6eija.mongodb.net/rocketseat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const connectedUsers = {};

// io -> utilizar dessa variavel para anotar todos os usuarios logados na aplicacao (seja web seja mobile)
io.on('connection', socket => {
    //console.log(socket.handshake.query);
    //console.log('Usuario conectado', socket.id);    

    // relacionando usuario id com seu socket id (id de conexao)
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

    //enviar mensagem em tempo real para o usuario
    //setTimeout(() => {
    //   socket.emit('hello', 'World');
    //}, 4000);
    //socket.on('omni', data => {
    //    console.log(data);
    //})
});


// antes das rotas
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next(); // colocar o return next para continuar com o fluxo da aplicacao  (ps: se nao fica travado aqui)
})
 
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

// yarn add nodemon -D => atualiza automaticamente o servidor quando ocorrerem atualizacoes
// yarn add socket.io => trabalhar com websockets (backend)
// yarn add socket.io-client => trabalhar com websockets (frontend)