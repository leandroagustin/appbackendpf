const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
} = require("../controllers/carritoController");

const router = express.Router();


router.post("/", middlewares.isRegister, createCarrito);//Post crea un nuevo carrito
router.post("/:idCarrito/:idPto", middlewares.isRegister, addPtoToCarrito); //Agrega un pto al carrito
router.delete("/:id", middlewares.isRegister, deleteCarrito); //Borra un carrito
router.delete("/:idCarrito/:idPto", middlewares.isRegister, deletePtoFromCarrito); //Borra un pto del carrito
router.get("/:id", middlewares.isRegister, getPtosFromCarrito); //Lista los productos de un carrito
router.get("/", middlewares.isAdmin, getCarritos); //Lista todos los carritos

module.exports = router;
