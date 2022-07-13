var express = require('express');
const router = express.Router();
const videogameR = require('./middlewares/videogames.js'); // importamos nuestros middlewares que usaremos para redigir a las rutas.
const genreR = require('./middlewares/genres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

module.exports = router;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json())

router.use('/videogames', videogameR); // cada vez que se haga un request a la ruta videogames se ejecutará el middleware videogameR

router.use('/genres', genreR); // cada vez que se haga un request a la ruta genres se ejecutará el middleware genreR




