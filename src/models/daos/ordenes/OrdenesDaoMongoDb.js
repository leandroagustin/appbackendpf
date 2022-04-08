const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class OrdenesDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super(
      "ordenes",
      new Schema({
        timestamp: { type: String, required: true },
        productos: { type: Array, required: true },
        estado: { type: String, default: "generada", required: true },
        direccion: { type: String, required: true },
        user: { type: Schema.ObjectId, ref: "users" },
      })
    );
  }

  async getByUser(idUser) {
    try {
      let docs = await super.getAll();
      const ordenesUser = docs.filter((n) => n.user === idUser);
      return ordenesUser;
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en getByUser");
    }
  }
}

module.exports = OrdenesDaoMongoDb;
