import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
    {
        id:{
            type: mongoose.Types.ObjectId
        },
        name: {
            type: String
        },
        color: {
            type: String
        }
    },
    {
        //marcas de tiempo
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('categories', categorySchema)