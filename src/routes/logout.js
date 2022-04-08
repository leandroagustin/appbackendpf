const { Router } = require ('express');
const router = new Router();

router.get("/", (req, res) => {
  req.logout();
  res.redirect('/')
}); //Logout del usuario

module.exports = router;
