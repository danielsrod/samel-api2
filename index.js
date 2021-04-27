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

  // Analisador de JSON
  app.use(express.json());

  // Middleware de rendereização do HTML
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "public"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");


  // HOME PAGE - OK
  app.get("/", (req, res) => {
    console.log("GET /");
    return res.render("home.html");
  });

  // LISTAR TODOS USUARIOS - OK
  app.get("/usuarios", async (req, res) => {
    console.log("GET /usuarios");

    allUsers = await usuarios.find().toArray()

    return res.json(allUsers);
  })

  // Listar 1 por Id - OK
  app.get("/usuarios/:id", async (req, res) => {
    console.log("GET /usuarios/:id");
    const { id } = req.params;

    const user = await usuarios.findOne( { _id: ObjectId(id) } )

    return res.json(user);
  })

  // Pagina de cadastro - OK
  app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro");
    return res.render("cadastro.html");
  });

  // Pagina de confirmação de cadastro - OK
  app.post("/cadastro", async (req, res) => {
    console.log("POST /cadastro");

    const cadastroUsuario = req.body;

    await usuarios.insertOne(cadastroUsuario);

    return res.render("cadastrado.html");
  });
  

  // Atualizar usuario - DOING
  app.put("/usuarios/:id", (req, res) => {
    console.log("PUT /usuarios");
    return res.send("Atualizar");
  });


  // Deletar usuario pelo Id - OK
  app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    await usuarios.deleteOne(
      { _id: ObjectId(id) }
    );

    return res.send(`Usuario com id: ${id} deletado.`);
  });

  // Rota de erro - OK
  app.all("/**", (req, res) => {
    return res.sendStatus(404);
  });

  app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`);
  });

})();