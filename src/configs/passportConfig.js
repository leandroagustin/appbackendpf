//Bcrypts
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Pasport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//Configs y helpers
const nodemailerConfig = require("../configs/nodemailerConfig");
const { darFecha } = require("../helpers/helpersFecha");
const Daos = require("../models/daos/factoryDb");

//Clase contenedora de users, carritos y chats
let carros = Daos.carritos;
let users = Daos.users;
let chats = Daos.chats;

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//Sign up
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //Valido el usuario
      let user = await users.getByUser(username);
      const hash = bcrypt.hashSync(password, saltRounds);
      let avatar = undefined;

      if (user) {
        //Error al validar
        loggerConsola.warn("El usuario ya existe");
        return done(null, false);
      } //Usuario valido lo guardo en la base de datos

      //Destructuracion de datos
      let { nombre, apellido, direccion, telefono, passwordRepeat } = req.body;

      //Chequeo que los passwords sean iguales
      if (password != passwordRepeat) {
        loggerConsola.warn("Los passwords no coinciden");
        return done(null, false);
      }

      //Creo un nuevo carrito y un nuevo chat para el usuario
      let carrito = { timestamp: darFecha(), productos: [] };
      let aux = await carros.save(carrito);
      carrito = aux.id;
      let chat = { timestamp: darFecha() };
      let aux2 = await chats.save(chat);
      chat = aux2.id;

      //Guardado en base de datos
      let userNew = await users.save({
        email: username,
        password: hash,
        nombre,
        apellido,
        direccion,
        telefono,
        avatar,
        carrito,
        chat,
      });

      //Envio de mail al administrador de la pagina
      const mailOptions = {
        from: "Desde Servidor NODE JS",
        to: "abbey.hintz4@ethereal.email",
        subject: "Nuevo registro!",
        html: "Datos del nuevo usuario <br>" + JSON.stringify(userNew),
      };
      await nodemailerConfig.sendMail(mailOptions);

      //TODO OK retorno done con el usuario
      return done(null, userNew);
    }
  )
);

//Sign in
passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    //Validacion a la base de datos
    let user = await users.getByUser(username);

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }
    }
    return done(null, false);
  })
);

//Serializacion
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserializacion
passport.deserializeUser(async (id, done) => {
  //Validacion a la base de datos
  let user = await users.getById(id);
  done(null, user);
});

module.exports = passport;
