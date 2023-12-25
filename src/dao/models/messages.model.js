import mongoose from "mongoose"
import {messagesCollection } from "../../constants/index.js";



const messagesSchema = new mongoose.Schema({

    user: String,
    message: String

})

export const messagesModel = mongoose.model(messagesCollection, messagesSchema)

export default messagesModel