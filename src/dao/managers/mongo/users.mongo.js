
import {usersModel } from "../../models/users.model.js";

export class UsersMongo{
    constructor(){
         this.model = usersModel;
    };

    async getUsers(){
        try {
            const users = await this.model.find().lean();
            return users;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los usuarios");
        }
    };

    async save(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async getById(userId){
        try {
            const user = await this.model.findById(userId).lean();
            if(user){
                return user;
            } else{
                throw new Error("El usuario no existe");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async getByEmail(userEmail){
        try {
            const user = await this.model.findOne({email:userEmail}).lean();
            if(user){
                return user;
            } else{
                return null;
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async update(userId,newUserInfo){
        try {
            const userUpdated = await this.model.findByIdAndUpdate(userId,newUserInfo,{new:true})
            return userUpdated;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
    async delete (options, entity) {
        if (!this.model[entity]) throw new Error('Entity not found in models')
        try {
            let results =  await this.model[entity].findOneAndDelete(options)
            return results
        } catch(err) {
            console.log(err.message)
            return null
        }
    };
}
