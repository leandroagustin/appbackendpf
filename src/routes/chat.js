const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getPublicChat,
  postPublicMsg,
  getChatByEmail,
  getPriveteChatByUser,
  postPrivateMessage,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/", middlewares.isRegister, getPublicChat); //Lista el chat gral
router.post("/", middlewares.isRegister, postPublicMsg); //Crea un nuevo mensaje en el chat gral
router.get("/private", middlewares.isRegister, getPriveteChatByUser); //Lista un chat privado
router.get("/:email", middlewares.isAdmin, getChatByEmail); //Lista los mensajes de un usuario en el chat general
router.post("/private", middlewares.isRegister, postPrivateMessage); //Crea un nuevo mensaje en un chat privado

module.exports = router;
