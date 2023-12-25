import {messagesDao} from "../dao/factory.js";
import { faker } from '@faker-js/faker';
import config from "../config/config.js";
class ChatService {

  static async getChatHistory(username) {
    return await messagesDao.getMessages(username); //TODO: handle chat not found
  }

  static async addChatMessage(username, newMessage) {
    await messagesDao.addMessagesToChat(username, newMessage);
    if (["development","testing"].includes(config.server.mode)) {
      const backendMessage = `${new Date().toLocaleString()}  -  BACKEND: ${faker.company.catchPhrase()}`;
      await chatDao.addMessagesToChat(username, backendMessage);
    }
    return await messagesDao.getMessages(username); //TODO: handle chat not found
  }

  static async createNewChat(userEmail) {
    return await messagesDao.createChat(userEmail);
  }

  static async deleteChat(id) {
    return await messagesDao.deleteChat(id);
  }
}

export default ChatService;