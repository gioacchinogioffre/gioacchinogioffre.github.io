var express = require('express');
const router = express.Router();
// const { Router } = require('express');
const videogameR = require('./middlewares/videogames.js');
const genreR = require('./middlewares/genre.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

module.exports = router;

// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json())

router.use('/videogames', videogameR);

router.use('/genre', genreR);




