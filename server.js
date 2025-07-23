const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
