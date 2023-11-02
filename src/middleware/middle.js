const jwt = require("jsonwebtoken");
function authenticateUser(req, res, next) {
  const dataUser = req.body;
  if (-1 === users.findIndex((user) => user.email === req.body.email))
    return res.status(401).send({ error: "Invalid user name or password" });
  else return next();
}

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY, {
      expiresIn: "30s",
    });
    req.rol = decodeToken.rol;
    console.log(req.rol);
  } catch (error) {
    return res.json({ error: "Token inválido o expirado" });
  }
  return next();
}

module.exports = { JWTValidation, authenticateUser };
