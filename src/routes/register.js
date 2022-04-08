const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "public/avatars/" });

const router = new Router();
const passportConfig = require("../configs/passportConfig");

router.post(
  "/",
  upload.single("avatar"),
  passportConfig.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/registerError.html",
  })
); //Crea un nuevo usuario

module.exports = router;
