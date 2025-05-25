//ARCHIVO PRINCIPAL: CREA EL SERVIDOR DE LA APLICACIÓN EN EL PUERTO 4000
//importaciones de las dependencias a usar
import express from 'express';
import morgan from 'morgan';
import {Server as SocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//desde routes
import router from './routes/message.js'
import message from './models/message.js';

//cofiguración mongoose
var url = 'mongodb+srv://dmendezmaza84:s7InGbp5DmJIBUvM@cluster0.azkurgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; //url de conexión para MongoDB en Atlas
mongoose.Promise = global.Promise;
const app = express();
const PORT = 4000;

//creación del servidor con el modulo http (este es el puente entre server y client xd)
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
});

//visualización de los middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//desde routes
app.use('/api', router);
//eventes desde client
io.on('connection', (socket) => {
    //para ver la cantidad de clientes conectados
    console.log('Cliente conectado con el ID: ')
    console.log(socket.id);
    //para que la información se envíe a todos los clientes
    socket.on('message', (message, nickname) => {
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })

})

//conexión a la base de datos por medio de puerto 4000
mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log('Conexión a la BD realizada con éxito');
    server.listen(PORT, () => {
        console.log('Aplicación ejecutandose en http://localhost:', PORT)
    })
})
