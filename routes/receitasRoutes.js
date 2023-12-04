const express = require('express');
const router = express.Router();

const receitas = [
    { id: 1, nome: 'Salada de Frutas', ingredientes: ['Maçã', 'Banana', 'Morango'], calorias: 150 },

];

router.get('/', (req, res) => {
    res.json(receitas);
});

router.post('/', (req, res) => {
    const novaReceita = req.body;
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});

module.exports = router;
