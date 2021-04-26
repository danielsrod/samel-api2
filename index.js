const express = require('express')
const app = express();
const port = 3333;

app.use(express.static('./public'));

app.get('/', (req, res) => {
    return res.send('hello world');
})

app.get('/cadastro', (req, res) => {
    return res.render('index.html');
})

app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}`)
})