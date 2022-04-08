const {
  createCarritoService,
  addPtoToCarritoService,
  deleteCarritoService,
  deletePtoFromCarritoService,
  getPtosFromCarritoService,
  getCarritosService,
} = require("../services/carritoService");

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

const createCarrito = async (req, res) => {
  try {
    let idCarrito = await createCarritoService();
    res.status(201)
    res.send(idCarrito);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createCarrito carritoController");
  }
}; //Post crea un nuevo carrito

const addPtoToCarrito = async (req, res) => {
  try {
    const { idPto, idCarrito } = req.params;
    const response = await addPtoToCarritoService(idPto, idCarrito);
    if (response.estado === "ok") {
      res.status(201)
      res.send(response.carrito);
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${idCarrito} no existe` });
    } else if (response.estado === "ptoFalse") {
      res.status(400);
      res.send({ error: `Producto con ID ${idPto} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en addPtoToCarrito carritoController");
  }
}; //Agrega un pto al carrito

const deleteCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCarritoService(id);
    if (response.estado === "ok") {
      res.status(200)
      res.send({ message: `Carrito con ID ${id} borrado` });
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deleteCarrito carritoController");
  }
}; //Borra un carrito

const deletePtoFromCarrito = async (req, res) => {
  try {
    const { idPto, idCarrito } = req.params;
    const response = await deletePtoFromCarritoService(idPto, idCarrito);
    if (response.estado === "ok") {
      res.status(200)
      res.send(response.carrito);
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${idCarrito} no existe` });
    } else if (response.estado === "ptoFalse") {
      res.status(400);
      res.send({ error: `Producto con ID ${idPto} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePtoFromCarrito carritoController");
  }
}; //Borra un pto del carrito

const getPtosFromCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getPtosFromCarritoService(id);

    if (response.estado === "ok") {
      res.status(200)
      res.send(response.products);
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtosFromCarrito carritoController");
  }
}; //Lista los productos de un carrito

const getCarritos = async (req, res) => {
  try {
    const response = await getCarritosService();
    res.status(200)
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getCarritos carritoController");
  }
}; //Lista todos los carritos

module.exports = {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
};
