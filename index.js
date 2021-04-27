// Dependencias
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

  app.get("/usuarios", async (req, res) => {
    allUsers = await usuarios.find().toArray()
    return res.json(allUsers);

  })

  app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    const user = await usuarios.findOne({ _id: ObjectId(id) })

    return res.json(user);

  })

  app.get("/cadastro", (req, res) => {
    return res.render("cadastro.html");

  });

  app.post("/cadastro", async (req, res) => {
    const cadastroUsuario = req.body;

    cadastroUsuario.created_at = new Date();
    cadastroUsuario.updated_at = new Date();

    await usuarios.insertOne(cadastroUsuario);

    return res.send('Usuario cadastrado com sucesso.');
  });

  app.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const {
      nome, telefone, cpf, email, filename, base64img
    } = req.body;

    const updateClient = {
      _id: ObjectId(id),
      nome,
      telefone,
      cpf,
      email,
      filename,
      base64img
    }

    updateClient.updated_at = new Date();

    await usuarios.updateOne(
      { _id: ObjectId(id) },
      { $set: updateClient }
    );

    return res.send(`Usuario com id ${id} foi atualizado.`);
  });

  app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    await usuarios.deleteOne(
      { _id: ObjectId(id) }
    );

    return res.send(`Usuario com id: ${id} foi deletado.`);
  });

  app.all("/*", (req, res) => {
    return res.sendStatus(404);
  });

  app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`);
  });

})();