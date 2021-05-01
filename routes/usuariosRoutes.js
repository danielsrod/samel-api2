const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
    allUsers = await usuarios.find().toArray()
    return res.json(allUsers);

})

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await usuarios.findOne({ _id: ObjectId(id) })

    return res.json(user);

})

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await usuarios.deleteOne(
        { _id: ObjectId(id) }
    );

    return res.send(`Usuario com id: ${id} foi deletado.`);
});

module.exports = router;
