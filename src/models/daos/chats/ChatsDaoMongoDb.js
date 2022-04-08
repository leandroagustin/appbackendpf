const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class ChatsDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super(
      "chats",
      new Schema({
        timestamp: {
          type: String,
          required: true,
        },
        messages: {
          type: Array,
          required: true,
          default: [],
        },
      })
    );
  }
}

module.exports = ChatsDaoMongoDb;
