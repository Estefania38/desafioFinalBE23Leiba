import { messagesModel } from '../../models/messages.model.js';

 
export class  MessagesMongo  {
    constructor(dao, model) {
        this.dao = dao
        this.model = messagesModel;
    }

    async newMessage (message) {

        this.dao.post({user:message.user, message:message.messages}, this.model)
        return true
    }

    async getHistorial () {
        const getAll = await this.dao.get({}, this.model)
        if(getAll != '') return getAll
        return false
    }
}
 


