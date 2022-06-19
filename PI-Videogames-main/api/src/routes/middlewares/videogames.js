require('dotenv').config();
var express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
const {
 API_KEY
  } = process.env;

module.exports = router;

const getApiVideogames = async () => {

    let pageNumber = 1
    let apiVideogames = []

    while (pageNumber <= 5) {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNumber}`)
    .then(res =>
    apiVideogames.push(res.data.results.map(vg => {
        return {
            name: vg.name,
            id: vg.id,
            released: vg.released,
            rating: vg.rating,
            background_image: vg.background_image,
            platforms: vg.platforms.map(p => p.platform.name),
            genres: vg.genres.map(g => { return { id: g.id, name: g.name } }),
        }})
    ))
    pageNumber++
}
    return apiVideogames.flat();
}


const getDbVideogames = async () => {
    const videogames = await Videogame.findAll(
        {include: [{model: Genre, attributes: ['name', 'id'], through: {attributes: []}}]
    })
    return videogames
}

const getAllVideogames = async () => {
    const apiVideogames = await getApiVideogames();
    const dbVideogames = await getDbVideogames();
    const allVideogames = [...dbVideogames, ...apiVideogames];
    return allVideogames
}


// - [ ] __GET /videogames?name="..."__:
// - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// - Si no existe ningún videojuego mostrar un mensaje adecuado

// [ ] __GET /videogames__:
// - Obtener un listado de los videojuegos
// - Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async (req, res) => {
    let {name} = req.query;
    let videogames = await getAllVideogames();
    try {
        if(name) {
            videogames = videogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()))
            videogames.length ? res.send(videogames) : videogames
        }
        else res.send(videogames);

    } catch (error) {
        res.status(404).json('There is no videogame with that name');
    }
})


// - [ ] __GET /videogame/{idVideogame}__:
// - Obtener el detalle de un videojuego en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// - Incluir los géneros asociados

router.get('/:videogameId', async (req, res) => {
    let { videogameId } = req.params;
    let videogames = await getAllVideogames()
    videogames = videogames.filter(vg => vg.id == videogameId)

    try {
        if(videogames.length) return res.json(videogames[0])
        else res.status(404).send('There is no video game with that id');
        }
     catch (e) {
        res.status(404).send(e.message);
    }
})


// - [ ] __POST /videogames__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// - Crea un videojuego en la base de datos, relacionado a sus géneros.


router.post('/', async (req, res) => {
    let { name, description , released, rating, platforms, background_image, genres } = req.body;
    if (!name || !description || !platforms) return res.status(404).send('Name, description and platforms are required');
   
   try {
       let newVideogame = await Videogame.create(req.body)
       console.log(newVideogame)
       await newVideogame.setGenres(genres)
       res.status(201).send('Videogame created successfully');
   } catch (e) {
    res.status(404).send(e.message);
   }

})


