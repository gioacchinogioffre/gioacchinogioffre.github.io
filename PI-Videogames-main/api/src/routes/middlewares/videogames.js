require('dotenv').config();
var express = require('express');
const router = express.Router();
const { Videogame, Genre } = require('../../db.js');
const { getAllVideogames, getVideogameById, getDbVideogames} = require('./utils.js');
// const axios = require('axios');
// const {Op} = require('sequelize');

module.exports = router;


// - [ ] __GET /videogames?name="..."__:
// - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// - Si no existe ningún videojuego mostrar un mensaje adecuado

// [ ] __GET /videogames__:
// - Obtener un listado de los videojuegos
// - Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async (req, res) => { // hacemos request get en la ruta /videogames
    let {name} = req.query;
    let videogames = await getAllVideogames(); // nos traemos todos los juegos invocando la función getAllVideogames que nos retornará un arreglo con juegos.
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

    // Nos traemos los juegos de la base de datos y de la API por separado. Lo hacemos de esta manera ya que mejora el rendimiento y velocidad.
    let videogamesDb = await getDbVideogames() // juegos DB
    videogamesDb = videogamesDb.filter(vg => vg.id == videogameId) // juego DB filtrado por id
    let videogameApi = await getVideogameById(videogameId) // juego API filtrado por id

    try {
        // Si existe alguno de los juegos en DB o API, lo enviamos.
        if(videogamesDb.length) return res.json(videogamesDb[0]) 
        if(videogameApi.length) return res.json(videogameApi[0])
        return res.status(404).send({msg: 'There is no video game with that id'});
        }
     catch (e) {
        res.status(404).send({msg: 'There is no video game with that id'});
    }
})


// - [ ] __POST /videogames__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// - Crea un videojuego en la base de datos, relacionado a sus géneros.


router.post('/', async (req, res) => { // creamos request post en la ruta /videogames
    let { name, description , released, rating, platforms, background_image, genres } = req.body; // mandamos la información del formulario por body
    if (!name || !description || !platforms) return res.status(404).send('Name, description and platforms are required'); // si alguno de los campos obligatorios no está lleno, mandamos un error.
   
   try {
       let newVideogame = await Videogame.create(req.body) // creamos el juego en la base de datos
       await newVideogame.setGenres(genres) // relacionamos el juego con sus géneros
       res.status(201).send({game: newVideogame, msg:'Videogame created successfully'});
   } catch (e) {
    res.status(404).send(e.message);
   }

})

router.delete('/:videogameId', async (req, res) => { // creamos request delete en la ruta /videogames/:videogameId para eliminar solo aquellos juegos creados y guardados en la DB.
    let { videogameId } = req.params;
    try {
        let videogame = await Videogame.findByPk(videogameId) // buscamos el juego por id en nuestra DB 
        await videogame.destroy() // eliminamos el registro utilizando método destroy
        res.status(200).send({msg:'Videogame deleted successfully'});
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.put('/:videogameId', async (req, res) => { // creamos request delete en la ruta /videogames/:videogameId para eliminar solo aquellos juegos creados y guardados en la DB.
    let { name, description , released, rating, platforms, background_image, genres } = req.body;
    let { videogameId } = req.params;
    try {
        let videogame = await Videogame.findByPk(videogameId) // buscamos el juego por id en nuestra DB 
        await videogame.update({
            name: name,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms,
            background_image: background_image,
            genres: genres
        })
        res.status(200).send({msg:'Videogame modified successfully'});
    } catch (e) {
        res.status(404).send(e.message);
    }
})



