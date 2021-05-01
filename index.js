// Dependencias
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const usuariosRoutes = require("./routes/usuariosRoutes");
const cadastroRoutes = require("./routes/cadastroRoutes");

(async () => {
  const connectionString = "mongodb+srv://admin:sameladmin@samel-cluster.awmdl.mongodb.net/test";
  const options = { useUnifiedTopology: true };

  console.info("Tentando conectar ao BD ...");
  const client = await MongoClient.connect(connectionString, options);
  console.info("Conectado ao BD")

  const db = client.db("samel-api");
  const usuarios = db.collection("users");

  const port = process.env.PORT || 3333;

  const app = express();

  // Middleware de requisições
  app.use(express.urlencoded({ extended: true }));

  // Middleware JSON
  app.use(express.json());

  // Middleware de rendereização do HTML

  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "public"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");


  app.get("/", (req, res) => {
    return res.render("home.html");

  });

  app.use('/usuarios', usuariosRoutes);
  app.use('/cadastro', cadastroRoutes);


  app.all("/*", (req, res) => {
    return res.sendStatus(404);
  });

  app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`);
  });

})();