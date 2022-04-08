const {
  getPublicChatService,
  postPublicMsgService,
  getChatByEmailService,
  getPriveteChatByUserService,
  postPrivateMessageService,
} = require("../services/chatService");

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

const getPublicChat = async (req, res) => {
  try {
    const response = await getPublicChatService();
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPublicChat chatController");
  }
}; //Lista el chat gral

const postPublicMsg = async (req, res) => {
  try {
    const email = req.user.email;
    const msg = req.body.msg;
    let tipo;
    if (req.user.isAdmin) {
      tipo = "sistema";
    } else {
      tipo = "usuario";
    }

    const response = await postPublicMsgService(msg, tipo, email);
    res.status(201).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en postPublicMsg chatController");
  }
}; //Crea un nuevo mensaje en el chat gral

const getChatByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const response = await getChatByEmailService(email);
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getChatByEmail chatController");
  }
}; //Lista un chat privado

const getPriveteChatByUser = async (req, res) => {
  try {
    if (!req.user) {
      return false;
    }

    let idChat = "";
    let isAdmin = "";
    let email = "";
    if (req.user.isAdmin) {
      isAdmin = true;
      email = req.query.email;
    } else {
      isAdmin = false;
      idChat = req.user.chat;
    }
    const response = await getPriveteChatByUserService(isAdmin, idChat, email);
    res.status(200).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPriveteChatByUser chatController");
  }
}; //Lista los mensajes de un usuario en el chat general

const postPrivateMessage = async (req, res) => {
  try {
    const msg = req.body.msg;
    const email = req.user.email;
    let isAdmin = false;
    let idChat;
    let emailUser;

    if (req.user.isAdmin) {
      isAdmin = true;
      emailUser = req.query.email;
    } else {
      idChat = req.user.chat;
    }

    const response = await postPrivateMessageService(
      msg,
      isAdmin,
      email,
      idChat,
      emailUser
    );
    res.status(201).send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en postPrivateMessage chatController");
  }
}; //Crea un nuevo mensaje en un chat privado

module.exports = {
  getPublicChat,
  postPublicMsg,
  getChatByEmail,
  getPriveteChatByUser,
  postPrivateMessage,
};
