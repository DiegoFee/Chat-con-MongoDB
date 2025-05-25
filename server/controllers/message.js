//importaciones para usar la variable Message de Models
import Message from "../models/message.js";

//objetos con funciones para cada accion de la aplicación (guardar, obtener)
var controller = {
    save: (req, res) => {
        var params = req.body
        console.log("Cuerpo recibido:", params); // <-- Agrega esto
        var message = new Message()

        message.message = params.message
        message.from = params.from
        console.log(message)

        message.save((error, messageStored) => {
            if(error || !messageStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'No ha sido posible guardar el mensaje'
                })
            }
            return res.status(200).send({
                status: 'Success',
                messageStored
            })
        })
    },


    getMessages: (req, res) => {
        var query = Message.find({})
        query.sort('-_id').exec((error, messages) => {
            if(error){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }
            if(!messages){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay mensajes que mostrar'
                })
            }


            return res.status(200).send({
                status: 'Success',
                messages
            })
        }) 
    }
}

//exportación con el resultado final
export default controller;