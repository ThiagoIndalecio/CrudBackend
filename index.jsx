const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes.jsx');
const clientRoutes = require('./routes/clientRoutes.jsx')
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/client',clientRoutes)


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
