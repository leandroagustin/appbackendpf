const ProductsService = require("../../models/contenedores/ContenedorMongoDb");

const rootGraphQL = {
  getAll: async () => {
    try {
      let data = await ProductsService.find({});
      return data;
    } catch (error) {
      console.log("Problemas con el get " + error);
    }
  },
  getById: async (id) => {
    try {
      let data = await ProductsService.find({ _id: id });
      return data;
    } catch (error) {
      console.log("ID no encontrado " + error);
    }
  },
  save: async (product) => {
    try {
      let newProd = {
        nombre: product.nombre,
        precio: product.precio,
        thumb: product.thumb,
      };
      let data = await new ProductsService(newProd).save();
      return data;
    } catch (error) {
      console.log("Problemas con el save " + error);
    }
  },
  deleteId: async (id) => {
    try {
      let data = await ProductsService.findOneAndRemove({ _id: id });
      return data;
    } catch (error) {
      console.log("Problemas con el delete " + error);
    }
  },
  updateId: async (id, product) => {
    try {
      let data = ProductsService.findOneAndUpdate({ _id: id }, product);
      return data;
    } catch (error) {
      console.log("Problemas con el update " + error);
    }
  },
};

module.exports = rootGraphQL;
