const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    return res.render("cadastro.html");
});

router.post("/", async (req, res) => {
    const cadastroUsuario = req.body;

    cadastroUsuario.created_at = new Date();
    cadastroUsuario.updated_at = new Date();

    await usuarios.insertOne(cadastroUsuario);

    return res.send(`<p>Usuario cadastrado com sucesso<p><br><a href="https://samel-api.herokuapp.com/">Home</a>`);
});

module.exports = router;