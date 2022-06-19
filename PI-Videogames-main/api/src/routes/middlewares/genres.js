var express = require('express');
const router = express.Router();
const { Op, Genre } = require('../../db.js');
const axios = require('axios');
// const getApiGenres = require('./utils.js');

module.exports = router;

const getApiGenres = async () => {
    const apiGenres = await axios.get('https://api.rawg.io/api/genres?key=2af3f6c5a1664ede9a13c4814da20f16')
    .then(res => res.data.results.map(g => {
        return {
            name: g.name,
            id: g.id,
            image_background: g.image_background,
            games: g.games.map(g => { return { id: g.id, names: g.names }})
        }
    })
    )
    return apiGenres;
}


// - [ ] __GET /genres__:
// - Obtener todos los tipos de géneros de videojuegos posibles
// - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/', async (req, res) => {
    const genresApi = await getApiGenres()
    genresApi.map(async g => {
       await Genre.findOrCreate({where : {name: g.name, id: g.id}})
    })
    res.json(genresApi)
    
    // Genre.findAll().then(genres => res.json(genres))

})
