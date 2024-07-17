
import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
    {
        //estructura del objeto, propiedades y tipos de datos
        id:{
            type: mongoose.Types.ObjectId
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        user_id: {
            type: Number
        },
        category_id: {
            type: Number
        },
        status_id:{
            type: Number
        }
    },
    {
        //marcas de tiempo
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('todos', todoSchema)