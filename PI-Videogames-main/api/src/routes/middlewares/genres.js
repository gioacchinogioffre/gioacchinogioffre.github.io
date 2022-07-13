var express = require('express');
const router = express.Router();
const { Genre } = require('../../db.js');
const {getApiGenres} = require('./utils.js');
// const axios = require('axios');

module.exports = router;

// - [ ] __GET /genres__:
// - Obtener todos los tipos de géneros de videojuegos posibles
// - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async (req, res) => { // hacemos request get en la ruta /genres para obtener todos los géneros.
    const genresApi = await getApiGenres() // nos guardamos en una constante los géneros invocando a la función getApiGenres que nos retornará el arreglo con géneros.
    genresApi.map(async g => { // Lo mapeamos y creamos en nuestro modelo/tabla cada uno de ellos.
       await Genre.findOrCreate({where : {name: g.name, id: g.id}}) // Usamos método findOrCreate para que busqué el género en la tabla y que lo cree si no lo encuentra.
    })
    res.json(genresApi) // respondemos con el arreglo de géneros.
})

// router.get('/:id', async (req, res) => {
//     const genre = await Genre.findOne({where: {id: req.params.id}})
//     res.json(genre)
// })