const express = require('express');
const router = express.Router();

// Informações de nutrição associadas a cada ingrediente
const informacoesNutricionais = {
    'Maçã': { calorias: 52, proteinas: 0.3, carboidratos: 13.8, gorduras: 0.2 },
    'Banana': { calorias: 89, proteinas: 1.1, carboidratos: 22.8, gorduras: 0.3 },
    'Morango': { calorias: 32, proteinas: 0.7, carboidratos: 7.7, gorduras: 0.3 },
    // Adicione mais informações nutricionais para outros ingredientes conforme necessário
};

// Função para calcular informações nutricionais de uma receita com base nos ingredientes
function calcularInformacoesNutricionais(receitaIngredientes) {
    let totalCalorias = 0;
    let totalProteinas = 0;
    let totalCarboidratos = 0;
    let totalGorduras = 0;

    receitaIngredientes.forEach(ingrediente => {
        if (informacoesNutricionais[ingrediente]) {
            totalCalorias += informacoesNutricionais[ingrediente].calorias;
            totalProteinas += informacoesNutricionais[ingrediente].proteinas;
            totalCarboidratos += informacoesNutricionais[ingrediente].carboidratos;
            totalGorduras += informacoesNutricionais[ingrediente].gorduras;
        }
    });

    return {
        calorias: totalCalorias,
        proteinas: totalProteinas,
        carboidratos: totalCarboidratos,
        gorduras: totalGorduras,
    };
}

// Rota para obter informações nutricionais com base nas receitas
router.get('/', (req, res) => {
    res.json(informacoesNutricionais);
});

router.post('/', (req, res) => {
    const novaInformacao = req.body;
    informacoesNutricionais.push(novaInformacao);
    res.status(201).json(novaInformacao);
});

router.post('/receitas', (req, res) => {
    const informacoesReceita = calcularInformacoesNutricionais(req.body.ingredientes);

    res.json(informacoesReceita);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = informacoesNutricionais.findIndex(item => item.id === id);
  
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Item não encontrado na lista de informacoes nutricionais' });
    }
  
    listaCompras.splice(index, 1);
    res.json({ mensagem: 'Item removido da lista de informacoes nutricionais com sucesso' });
  });

module.exports = router;
