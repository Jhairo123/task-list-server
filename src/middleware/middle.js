const jwt = require("jsonwebtoken");

const users = [
  { id: 1, email: "correo@gmail.com", password: "contrasena1", rol: "user" },
  { id: 2, email: "correo1@gmail.com", password: "contrasena2", rol: "user" },
];

function authenticateUser(req, res, next) {
  const dataUser = req.body;
  if (-1 === users.findIndex((user) => user.email === req.body.email))
    return res.status(401).send({ error: "Invalid user name or password" });
  else return next();
}

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.rol = decodeToken.rol;
  } catch (error) {
    return res.json({ error: "Token inválido o expirado" });
  }
  return next();
}

module.exports = { JWTValidation, authenticateUser };
