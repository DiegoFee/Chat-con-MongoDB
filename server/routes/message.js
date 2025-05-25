//importación de la dependencia Express para usar sus rutas de FrameWork
import express from 'express';
import controller from '../controllers/message.js'

//definicimos las rutas de la aplicación
var router = express.Router();

router.post('/save', controller.save);
router.get('/messages', controller.getMessages);

//exportación del resultado final
export default router