require('dotenv').config();
var express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
const { getAllVideogames, getVideogameById, getDbVideogames} = require('./utils.js');

module.exports = router;


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
            videogames.length ? res.send(videogames.slice(0, 15)) : videogames
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
    let videogamesDb = await getDbVideogames()
    let videogameApi = await getVideogameById(videogameId)
    videogamesDb = videogamesDb.filter(vg => vg.id == videogameId)
    // videogames = videogames.filter(vg => vg.id == videogameId)

    try {
        if(videogamesDb.length) return res.json(videogamesDb[0])
        if(videogameApi.length) return res.json(videogameApi[0])
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
       await newVideogame.setGenres(genres)
       res.status(201).send({game: newVideogame, msg:'Videogame created successfully'});
   } catch (e) {
    res.status(404).send(e.message);
   }

})

router.delete('/:videogameId', async (req, res) => {
    let { videogameId } = req.params;
    try {
        let videogame = await Videogame.findByPk(videogameId)
        await videogame.destroy()
        res.status(200).send({msg:'Videogame deleted successfully'});
    } catch (e) {
        res.status(404).send(e.message);
    }
})

