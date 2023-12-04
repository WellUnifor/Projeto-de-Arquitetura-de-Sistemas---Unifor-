const express = require('express');
const bodyParser = require('body-parser');
const receitasRoutes = require('./routes/receitasRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors
// Defina o roteador para as rotas de receitas
app.use('/receitas', receitasRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
