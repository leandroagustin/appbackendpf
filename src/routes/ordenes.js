const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getAllOrdenes,
  createOrder,
  getOrdenes,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordenesController");

const router = express.Router();

router.get("/", middlewares.isRegister, getOrdenes); //Lista las ordenes creadas por el usuario
router.get("/all", middlewares.isAdmin, getAllOrdenes); //Lista todas las ordenes creadas por todos los usuarios
router.post("/:idCarrito", middlewares.isRegister, createOrder); //Crea una nueva orden segun un carrito
router.put("/:idOrden", middlewares.isAdmin, updateOrder); //Modifica una orden segun su id
router.delete("/:idOrden", middlewares.isAdmin, deleteOrder); //Borra una orden segun su id

module.exports = router;
