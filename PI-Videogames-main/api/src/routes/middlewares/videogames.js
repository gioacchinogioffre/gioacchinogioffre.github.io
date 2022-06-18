var express = require('express');
// const Videogame = require('../../models/Videogame');
const router = express.Router();
const { Op, Videogame, Genre } = require('../../db.js');

module.exports = router;


// - [ ] __GET /videogames?name="..."__:
// - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// - Si no existe ningún videojuego mostrar un mensaje adecuado

// [ ] __GET /videogames__:
// - Obtener un listado de los videojuegos
// - Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async (req, res) => {
    let vgName = req.query.name;
    try {
        if(Object.keys(req.query).length) {
            Videogame.findAll({ limit: 15, where: { name: {[Op.substring]: 'tenis'} } })
            .then(videogames => {videogames ? res.send(videogames) : videogames})
        }
        else Videogame.findAll().then(videogames => res.json(videogames));

    } catch (error) {
        res.status(404).send('There is no video game with that name');
    }
    // res.send('esto son los videojuegos')
})


// - [ ] __GET /videogame/{idVideogame}__:
// - Obtener el detalle de un videojuego en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// - Incluir los géneros asociados

router.get('/:videogameId', async (req, res) => {
    let { videogameId } = req.params;
    console.log(videogameId, 'hola')
    const videogame = await Videogame.findByPk(videogameId);
    try {
        if(videogame) {
            videogame.getGenres().then(genres => {
                res.json({videogame: videogame, genres: genres
                })
            })
        }
        else res.status(404).send('There is no video game with that id');
       
    } catch (e) {
        res.status(404).send('Videogame not found');
    }
})


// - [ ] __POST /videogames__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// - Crea un videojuego en la base de datos, relacionado a sus géneros.


router.post('/', async (req, res) => {
    let { name, description , released, rating, platforms, background_image } = req.body;
    if (!name || !description || !platforms) return res.status(404).send('Name, description and platforms are required');
   
   try {
       const newVideogame = await Videogame.create(req.body)
       res.status(201).send('Videogame created successfully');
   } catch (e) {
    res.status(404).send('Invalid data');
   }

})


