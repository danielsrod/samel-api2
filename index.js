const express = require("express");
const path = require("path");

const port = 3333;
const app = express();
app.use(express.urlencoded({extended: true}));

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
  const {
    input_nome,
    input_telefone,
    input_cpf,
    input_email,
    input_file,
    input_base64,
  } = req.body;

  const sendToDB = {
    nome: input_nome,
    telefone: input_telefone,
    cpf: input_cpf,
    email: input_email,
    imagem: {
      nomeOriginal: input_file,
      base64string: input_base64,
    },
  };

  return res.render("cadastrado.html");
});

app.listen(port, () => {
  console.info(`App rodando em: http://localhost:${port}`);
});
