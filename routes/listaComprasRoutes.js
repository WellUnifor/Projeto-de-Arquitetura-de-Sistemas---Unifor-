const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

let listaCompras = [
  { id: 1, nome: 'Banana'},
];

// Rota para obter a lista de compras
router.get('/', (req, res) => {
  res.json(listaCompras);
});

// Atualiza a lista de compras com os itens vencidos do estoque
router.get('/atualizar-itens-vencidos', async (req, res) => {
  try {
    const estoqueResponse = await fetch('http://localhost:3000/estoque/validade');
    const produtosVencidos = await estoqueResponse.json();

    // Adicionar itens vencidos à lista de compras
    listaCompras.push(...produtosVencidos);

    res.json({ mensagem: 'Itens vencidos atualizados na lista de compras' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensagem: 'Erro ao atualizar itens vencidos' });
  }
});

// Rota para adicionar um item à lista de compras
router.post('/', (req, res) => {
  const novoItem = req.body;

  // Verifica se já existe um item com o mesmo nome na lista
  const itemExistente = listaCompras.find(item => item.nome === novoItem.nome);

  if (itemExistente) {
      return res.status(400).json({ error: 'Já existe um item com o mesmo nome na lista.' });
  }

  novoItem.id = listaCompras.length + 1;
  listaCompras.push(novoItem);
  res.status(201).json(novoItem);
});

  
  // Rota para remover um item da lista de compras
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = listaCompras.findIndex(item => item.id === id);
  
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Item não encontrado na lista de compras' });
    }
  
    listaCompras.splice(index, 1);
    res.json({ mensagem: 'Item removido da lista de compras com sucesso' });
  });
  
  // Rota para limpar a lista de compras
  router.delete('/clear', (req, res) => {
    listaCompras = [];
    res.json({ mensagem: 'Lista de compras limpa com sucesso' });
  });
  

module.exports = router;
