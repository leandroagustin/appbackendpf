
const getUser = (req, res) => {
  if (req.user) {
    res.status(200)
    res.send({
      user: req.user.nombre,
      avatar: req.user.avatar,
      carrito: req.user.carrito,
      chat: req.user.chat,
      isAdmin : req.user.isAdmin
    });
  } else {
    res.status(403)
    res.send(false);
  }
}; //Lista datos especificos del usuario

module.exports = {
  getUser,
};
