const { darFecha } = require("../helpers/helpersFecha");
const {
  getPtosService,
  getPtoIdService,
  getPtoCatSevice,
  createPtoService,
  updatePtoService,
  deletePtoService,
} = require("../services/productosService");

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

const getPtos = async (req, res) => {
  try {
    const response = await getPtosService();
    res.status(200);
    res.send(response);
  } catch (error) {
    throw Error("Error en getPtos productosController");
  }
}; //Lista todos los productos

const getPtoId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getPtoIdService(id);
    if (response.estado === "ok") {
      res.status(200);
      res.send(response.producto);
    } else if (response.estado === "ptoFalse") {
      res.status(400);
      res.send({ error: `Producto con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtoId productosController");
  }
}; //Lista un producto por su id

const getPtosCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await getPtoCatSevice(category);
    if (response.estado === "ok") {
      res.status(200);
      res.send(response.productos);
    } else if (response.estado === "categoryFalse") {
      res.status(400);
      res.send({ error: `No existen productos con la categoria ${category}` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtosCategory productosController");
  }
}; //Lista los productos por categoria

const createPto = async (req, res) => {
  try {
    //Armo un nuevo PTO con los datos recibidos por parametro y datos locales como fecha
    const { nombre, descripcion, categoria, thumbail, precio, stock } =
      req.body;
    const newObj = {
      timestamp: darFecha(),
      nombre,
      descripcion,
      categoria,
      thumbail,
      precio,
      stock,
    };
    const response = await createPtoService(newObj);
    res.status(201);
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createPto productosController");
  }
}; //Crea un nuevo producto

const updatePto = async (req, res) => {
  try {
    //Armo un nuevo PTO con los datos recibidos por parametro
    const { nombre, descripcion, categoria, thumbail, precio, stock } =
      req.body;
    const { id } = req.params;
    const ptoMod = {
      id,
      timestamp: darFecha(),
      nombre,
      descripcion,
      categoria,
      thumbail,
      precio,
      stock,
    };
    const response = await updatePtoService(ptoMod, id);
    if (response.estado === "ok") {
      res.status(201);
      res.send(response.producto);
    } else if (response.estado === "ptoFalse") {
      res.status(400);
      res.send({ error: `Producto con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en updatePto productosController");
  }
}; //Modifica un producto segun su id

const deletePto = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deletePtoService(id);
    if (response.estado === "ok") {
      res.status(200);
      res.send(response.productos);
    } else if (response.estado === "ptoFalse") {
      res.status(400);
      res.send({ error: `Producto con ID ${id} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePto productosController");
  }
}; //Borra un producto segun su id

module.exports = {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
  getPtosCategory,
};
