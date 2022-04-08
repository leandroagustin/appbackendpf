const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();
const middlewares = require("./src/middlewares/middlewares");

//compression
const cluster = require("cluster");

const numCPUS = require("os").cpus().length;
const compression = require("compression");

//connect-mongo
const MongoStore = require("connect-mongo");

//Logs
const logs = require("./src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//Servidor HTTP
const http = require("http");

if (cluster.isMaster) {
  for (let i = 0; i < numCPUS; i++) {
    //worker
    cluster.fork(); //creo un proceso para cada nucleo
  }
  cluster.on("exit", () => {
    console.log(`Process ${process.pid} died`);
  });
} else {
  //Comienzo APP
  const PORT = process.env.PORT || 8080;
  const app = express();
  const server = http.createServer(app);

  //MIDLEWARES
  app.use(compression());
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname + "/public/views"));
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));

  //Sesiones
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
      secret: "shhh!",
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 60000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //Routes
  const productos = require("./src/routes/productos");
  const carrito = require("./src/routes/carrito");
  const ordenes = require("./src/routes/ordenes");
  const chats = require("./src/routes/chat");
  app.use("/api/productos", productos);
  app.use("/api/carrito", carrito);
  app.use("/api/ordenes", ordenes);
  app.use("/api/chat", chats);

  const register = require("./src/routes/register");
  const login = require("./src/routes/login");
  const logout = require("./src/routes/logout");
  app.use("/register", register);
  app.use("/login", login);
  app.use("/logout", logout);

  //Ruta inicial
  app.use("/", middlewares.isRegister, (req, res) => {
    res.status(301).redirect("/productos.html");
  });

  //Manejo error 404
  app.use((req, res, next) => {
    res.status(404);
    res.send({
      error: -2,
      descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
    });
  });

  // //Graphql
  const { graphqlHTTP } = require("express-graphql");
  const schemaGraphql = require("./src/routes/graphql/schema");
  const rootGraphQL = require("./src/routes/graphql/root");

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schemaGraphql,
      rootValue: rootGraphQL,
      graphiql: true,
    })
  );

  //Servidor de Socket
  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.emit("render", "");
    socket.emit("renderchat", "");
    socket.on("actualizacion", () => {
      socket.emit("render", "");
    });
    socket.on("chat", () => {
      io.sockets.emit("renderchat", "");
    });
    socket.emit("msn", "");
  });

  //Comienzo Servidor
  server.listen(PORT, () => {
    loggerConsola.info(`Server is run on port ${server.address().port}`);
  });
  server.on("error", (error) =>
    loggerError.error(`Error en servidor ${error}`)
  );
}
