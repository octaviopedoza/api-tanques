require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const {dbConect} = require('./db/mongoo');
const express = require('express');
const cors = require('cors');

console.log("app node iniciada");

dbConect();