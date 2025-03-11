const jwt = require("jsonwebtoken");

//hay que usar formas de enviar el token, bearer token puede ser
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //si existe la autorizacion
  if (!authHeader)
    return res
      .status(403)
      .send({ auth: false, message: "No se proveyó un token" });

  const token = authHeader.split(" ")[1]; //se envia "Bearer " y el token
  if (!token)
    return res.status(403).send({ auth: false, message: "Token Malformado" });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    //verifica si el token es correcto y firmado por mi,está vencido u otro
    if (error) {
      return res
        .status(500)
        .send({ auth: false, message: "Falla al autenticarse" });
    }
    next();
  });
};
