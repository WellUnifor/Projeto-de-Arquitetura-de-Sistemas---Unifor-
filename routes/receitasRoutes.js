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
    novaReceita.id = receitas.length + 1;
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = receitas.findIndex(receita => receita.id === id);

    if (index !== -1) {
        const receitaAtualizada = req.body;
        receitaAtualizada.id = id;
        receitas[index] = receitaAtualizada;
        res.json(receitaAtualizada);
    } else {
        res.status(404).json({ mensagem: 'Receita não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = receitas.findIndex(receita => receita.id === id);

    if (index !== -1) {
        const receitaRemovida = receitas.splice(index, 1)[0];
        res.json(receitaRemovida);
    } else {
        res.status(404).json({ mensagem: 'Receita não encontrada' });
    }
});


module.exports = router;
