const { Router } = require ('express');
const passportConfig = require("../configs/passportConfig")
const {getUser} = require("../controllers/loginController")


const router = new Router();

router.get("/", getUser); //Lista datos especificos del usuario

router.post("/", passportConfig.authenticate("local-login",{
  successRedirect:"/productos.html",
  failureRedirect:"/loginError.html"
})) //Login del usuario


module.exports = router;
