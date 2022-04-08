const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class ProductosDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super(
      "productos",
      new Schema({
        timestamp: { type: String, required: true },
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        categoria: { type: String, required: true },
        thumbail: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
      })
    );
  }
  async getByCategory(category) {
    try {
      let docs = await super.getAll();
      const ptosCategory = docs.filter((n) => n.categoria === category);
      return ptosCategory;
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en getByCategory");
    }
  }
}

module.exports = ProductosDaoMongoDb;
