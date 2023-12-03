const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o módulo cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors

const receitas = [
    { id: 1, nome: 'Salada de Frutas', ingredientes: ['Maçã', 'Banana', 'Morango'], calorias: 150 },
    // Adicione mais receitas conforme necessário
];

app.get('/receitas', (req, res) => {
    res.json(receitas);
});

app.post('/receitas', (req, res) => {
    const novaReceita = req.body;
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
