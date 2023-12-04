const express = require('express');
const bodyParser = require('body-parser');
const receitasRoutes = require('./routes/receitasRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors
// Defina o roteador para as rotas de receitas
app.use('/receitas', receitasRoutes);

app.use('/estoque', estoqueRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
