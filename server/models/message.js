//importaciones para uso de la dependecia mongoose
import mongoose from "mongoose";
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: String,
    from: String
})

//exportación del resultado de la variable mensaje
export default mongoose.model('Message', MessageSchema);
