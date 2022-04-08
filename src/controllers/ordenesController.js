const {
  getAllOrdenesService,
  createOrderService,
  getOrdenesService,
  updateOrderService,
  deleteOrderService,
} = require("../services/ordenesService");

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

const getOrdenes = async (req, res) => {
  try {
    const response = await getOrdenesService(req.user.id);
    res.status(200);
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getOrdenes ordenesController");
  }
}; //Lista las ordenes creadas por el usuario

const getAllOrdenes = async (req, res) => {
  try {
    const response = await getAllOrdenesService();
    res.status(200);
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getAllOrdenes ordenesController");
  }
}; //Lista todas las ordenes creadas por todos los usuarios

const createOrder = async (req, res) => {
  try {
    let { idCarrito } = req.params;
    let idUser = req.user.id;
    let email = req.user.email;
    //Validacion direccion
    let dir = "";
    if (req.body.direccion) {
      dir = req.body.direccion;
    } else {
      res.status(400);
      res.send({ error: `La direccion es obligatoria` });
      return;
    }

    const response = await createOrderService(idCarrito, idUser, dir, email);
    if (response.estado === "ok") {
      res.status(201);
      res.send(response.orden);
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${idCarrito} no existe` });
    } else if (response.estado === "stockFalse") {
      res.status(400);
      res.send({
        error: `Sin stock suficiente del producto ${response.producto.nombre}`,
      });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createOrder ordenesController");
  }
}; //Crea una nueva orden segun un carrito

const updateOrder = async (req, res) => {
  try {
    const idOrden = req.params.idOrden;
    const { productos, estado, direccion } = req.body;
    const ordenMod = {
      id: idOrden,
      productos,
      estado,
      direccion,
    };
    const response = await updateOrderService(idOrden, ordenMod);
    if (response.estado === "ok") {
      res.status(201);
      res.send(response.order);
    } else if (response.estado === "ordenFalse") {
      res.status(400);
      res.send({ error: `Orden con ID ${idOrden} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en updateOrder ordenesController");
  }
}; //Modifica una orden segun su id

const deleteOrder = async (req, res) => {
  try {
    const idOrden = req.params.idOrden;
    const response = await deleteOrderService(idOrden);
    if (response.estado === "ok") {
      res.status(200);
      res.send(response.ordenes);
    } else if (response.estado === "ordenFalse") {
      res.status(400);
      res.send({ error: `Orden con ID ${idOrden} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deleteOrder ordenesController");
  }
}; //Borra una orden segun su id

module.exports = {
  getAllOrdenes,
  createOrder,
  getOrdenes,
  updateOrder,
  deleteOrder,
};
