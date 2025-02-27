require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const {dbConect} = require('./db/mongoo');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/tanques');
console.log("app node iniciada");
dbConect();

const app = express();

const port = process.env.PORT || 4100

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', routes);

app.listen(port, () => {
    console.log("app corriendo dentro del puerto: http://localhost:" + port);
})