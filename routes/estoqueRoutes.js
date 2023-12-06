const express = require('express');
const router = express.Router();

let estoque = [
    { id: 1, nome: 'Maçã', quantidade: 10,validade:"2023-01-10" },
  ];

  router.get('/validade', async (req, res) => {
    try {
      const response = await fetch('http://localhost:3000/estoque');
      const estoque = await response.json();
  
      // Obtendo a data atual
      const dataAtual = new Date();
  
      // Filtrando os itens do estoque cuja data de validade é posterior à data atual
      const produtosValidadeVencida = estoque.filter(item => {
        const dataValidade = new Date(item.validade); // Convertendo a string de validade para um objeto Date
        
        return dataValidade < dataAtual;
      });

      await Promise.all(
        produtosValidadeVencida.map(async vencido => {
          await fetch('http://localhost:3000/lista', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nome: vencido.nome }), // Ajuste conforme a estrutura real do seu objeto
                    });

          try {
            const response = await fetch(`http://localhost:3000/estoque/${vencido.id}`, {
              method: 'DELETE',
            });
    
            if (!response.ok) {
              throw new Error('Erro ao excluir item vencido');
            }
          } catch (error) {
            console.error(error.message);
          }
        })
      );
  
      res.json(produtosValidadeVencida);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o estoque' });
    }
  });
  
  // Rota para obter todos os itens do estoque
  router.get('/', (req, res) => {
    res.json(estoque);
  });
  
  // Rota para obter um item específico do estoque por ID
  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = estoque.find(item => item.id === id);
  
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
  
    res.json(item);
  });
  
  // Rota para adicionar um novo item ao estoque
  router.post('/', (req, res) => {
    const novoItem = req.body;
    novoItem.id = estoque.length + 1;
    estoque.push(novoItem);
    res.status(201).json(novoItem);
  });
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  const index = estoque.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }

  estoque.splice(index, 1);
  res.json({ message: 'Item excluído com sucesso' });
  });

  

  module.exports = router;