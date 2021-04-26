const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

(async () => {
  const connectionString = "mongodb+srv://admin:sameladmin@samel-cluster.awmdl.mongodb.net/test";
  const options = { useUnifiedTopology: true };

  console.info("Tentando conectar ao BD ...");
  const client = await MongoClient.connect(connectionString, options);
  console.info("Conectado ao BD")

  const db = client.db("samel-api");
  const usuarios = db.collection("users");

  const port = 3333;
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  // Middleware de rendereização do HTML
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "public"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  app.get("/", (req, res) => {
    console.log("GET /");
    return res.render("home.html");
  });

  app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro");
    return res.render("cadastro.html");
  });

  app.post("/cadastro", (req, res) => {
    console.log("POST /cadastro");
    return res.render("cadastrado.html");
  });

  app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`);
  });

})();
