
import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
    {
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
            type: String
        },
        category_id: {
            type: String
        },
        status_id:{
            type: String
        }
    },
    {
        //marcas de tiempo
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('todos', todoSchema)