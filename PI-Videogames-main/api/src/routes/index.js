var express = require('express');
const router = express.Router();
// const { Router } = require('express');
const videogameR = require('./middlewares/videogames.js');
const genreR = require('./middlewares/genres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

module.exports = router;

// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json())


const getApiGenres = async () => {
    const apiUrl = await axios.get ('https://api.rawg.io/api/genres?key=2af3f6c5a1664ede9a13c4814da20f16');
    const apiGenres = await apiUrl.data.results.map(g => {
        return {
            name: g.name,
            id: g.id,
            image_background: g.image_background
        }
    })
}


router.use('/videogames', videogameR);

router.use('/genres', genreR);




