const app = require('express')();
const port = 3333;

app.get('/', (req, res) => {
    return res.send('hello world');
})

app.listen(port, () => {
    console.info(`App rodando em: https://localhost:${port}`)
})