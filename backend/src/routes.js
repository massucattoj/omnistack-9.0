const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

// carinha responsavel pelas rotas do express e separando ele em uma variavel que
// possui todos os metdos (get, post, ...)
const routes = express.Router();
const upload = multer(uploadConfig);

// rotas
routes.post('/sessions', SessionController.store);


routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store); //segundo paramentro -> single (unico arquivo)
                                                                         // nome do campo -> thumbnail
routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

// criar uma rota para aceitar solicitacao e uma para rejeitar solicitacao
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes; 