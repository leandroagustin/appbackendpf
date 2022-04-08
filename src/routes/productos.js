const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
  getPtosCategory
} = require("../controllers/productosController");
const router = express.Router();

router.get("/", getPtos); //Lista todos los productos
router.get("/id/:id", getPtoId); //Lista un producto por su id
router.get("/categoria/:category", getPtosCategory) //Lista los productos por categoria
router.post("/", middlewares.isAdmin, createPto); //Crea un nuevo producto
router.put("/:id", middlewares.isAdmin, updatePto); //Modifica un producto segun su id
router.delete("/:id", middlewares.isAdmin, deletePto); //Borra un producto segun su id

module.exports = router;
