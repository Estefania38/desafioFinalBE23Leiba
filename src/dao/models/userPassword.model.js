import mongoose from "mongoose";
import {userPasswordCollection } from "../../constants/index.js";

const userPasswordSchema = new mongoose.Schema({
    email: {type:String , ref:'users'},
    token: {type:String , required:true},
    isUsed: {type:Boolean , default:false},
    createdAt: {type:Date , default:Date.now}
})

mongoose.set('strictQuery', false)

userPasswordSchema.index({createdAt:1},{expireAfterSeconds:3600})

export const userPasswordModel = mongoose.model(userPasswordCollection,userPasswordSchema)

export default userPasswordModel