const express = require("express");
const cors = require("cors");
require("dotenv").config(); //para uso de variables e entorno
const bodyParser = require("body-parser");

const usuarioRoutes = require("./routes/usuarioRoutes");
const rutinaRoutes = require("./routes/rutinaRoutes");
const mensajeRoutes = require("./routes/mensajeRoutes");
const authRoutes = require("./routes/authRoutes");
const tipoPlanRoutes = require("./routes/tipoPlanRoutes");
const turnoRoutes = require("./routes/turnoRoutes");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type ,Authorization" // Encabezados permitidos
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/usuarios", usuarioRoutes);
app.use("/rutinas", rutinaRoutes);
app.use("/mensajes", mensajeRoutes);
app.use("/planes", tipoPlanRoutes);
app.use("/auth", authRoutes);
app.use("/turnos", turnoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
