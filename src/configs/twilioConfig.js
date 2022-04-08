const twilio = require("twilio");

//Configuracion TWILIO
const accountSid = "ACe51d38b8f8f37b623fad3470cb7fda17";
const authToken = "a9f973e74cd575155dcb08235874e0bb";

const twilioClient = twilio(accountSid, authToken);

module.exports = twilioClient;
