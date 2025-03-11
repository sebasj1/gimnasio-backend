const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("../models/user_model");
const { createUser, getUserByEmailToSesion } = require("./usuarioController");

//SE registra un usuario nuevo,se le da un token y se inicia sesion(eso está en proceso)
exports.register = (req, res) => {
  try {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    const user = { ...req.body, password: hash };
    req.body = user;
    createUser(req, res, (isSuccess) => {
      if (isSuccess) {
        const token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        users.push({ email: req.body.email, token });
      } else {
        return;
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = (req, res) => {
  //busca el usuario que coincida con el  correo
  try {
    getUserByEmailToSesion(req, res, (user, isSuccess) => {
      //si encontro el usuario validamos su contraseña comárandola con la registrada
      if (isSuccess) {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordIsValid) {
          const token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          users.push({ email: req.body.email, token });
          const dataUser = {
            ...user,
            password: "",
          };
          return res
            .status(200)
            .json({ message: "Inicio sesión", token, dataUser });
        } else {
          //si contraseña incorrecta mensaje
          return res.status(401).json({ message: "Credenciales invalidas" });
        }
      } else {
        //si no lo encuentra mensaje
        return res.status(401).json({ message: "Credenciales invalidas" });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

