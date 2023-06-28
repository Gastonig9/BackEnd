import messageModel from "../schemas/messages.schema.js";

export default class MessageManagerMdb {
  constructor() {
    this.messageModel = messageModel;
  }

  async addNewMessage(user, message) {
    try {
      const msg = await this.messageModel.create({ user: user, message: message }); // Corregido el nombre del campo a "message"
      return msg;
    } catch (error) {
      throw new Error("Could not add message");
    }
  }

  async getMessage() {
    try {
      const messages = await this.messageModel.find();
      return messages;
    } catch (error) {
      throw new Error("Could not get messages");
    }
  }
}
