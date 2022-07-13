const axios = require('axios'); // requerimos axios para hacer peticiones asincronas a la API
const { Videogame, Genre } = require('../../db.js'); // requerimos nuestros modelos/tablas de la base de datos
// const {Op} = require('sequelize');
const {
    API_KEY
     } = process.env;

module.exports = { // exportamos todas nuestras funciones para que sean utilizadas por nuestros middlewares.
    getApiGenres: getApiGenres,
    getApiVideogames: getApiVideogames,
    getDbVideogames: getDbVideogames,
    getAllVideogames: getAllVideogames,
    getVideogameById: getVideogameById
}


async function getApiGenres () {
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) // nos traemos los géneros de la API y lo guardamos en una constante. 
    .then(res => res.data.results.map(g => { // accedemos a la data devuelta por axios y a la propiedad results que es un arreglo donde estarán guardados cada género como un objeto. Por cada elemento del arreglo, retornamos un objeto solo con la siguiente info de la API:
        return {
            name: g.name,
            id: g.id,
            image_background: g.image_background,
            // games: g.games.map(g => { return { id: g.id, names: g.names }})
        }
    })
    )
    return apiGenres // retornamos el arreglo de géneros.
}

async function getApiVideogames() {

    let pageNumber = 1 // instanciamos pageNumber en 1 para que empiece en la primera página de la API (debemos los primeros 100 juegos de la misma, el corte es en la página 5).
    let apiVideogames = [] // instanciamos arreglo vacío para ir guardando los videojuegos.

    while (pageNumber <= 5) { // Mientras la página sea menor o igual a 5...
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNumber}`) // hacemos una petición a la API para obtener los juegos de la página correspondiente.
    .then(res => // accedemos a la data devuelta por axios y a la propiedad results que es un arreglo donde estarán guardados cada juego como un objeto. Por cada elemento del arreglo, retornamos un objeto solo con la siguiente info de la API y lo pusheamos a nuestro arreglo apiVideogames.
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
    pageNumber++ // aumentamos valor de la página en 1.
}
    return apiVideogames.flat(); // usamos flat() para que el arreglo se convierta en un arreglo de un solo nivel y lo retornamos.
}

async function getDbVideogames() {
    const videogames = await Videogame.findAll( // buscamos todos los videojuegos de la base de datos y lo guardamos en constante.
        {include: [{model: Genre, attributes: ['name', 'id'], through: {attributes: []}}] // incluimos a cada videojuego la tabla género con los atributos name y id.
    })
    return videogames // retornamos los juegos de la base de datos.
}

async function getAllVideogames() { 
    const apiVideogames = await getApiVideogames(); // guardamos en constante los juegos de la API
    const dbVideogames = await getDbVideogames(); // Guardamos en constante los juegos de la DB
    const allVideogames = [...dbVideogames, ...apiVideogames]; // Concatenamos ambos arreglos y lo retornamos.
    console.log(allVideogames)
    return allVideogames
}

async function getVideogameById (id){ // función para obtener un juego por su id.
    try{
    let videogames = []
    videogames.push(await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`) // hacemos una petición a la API para obtener el juego con el id correspondiente.
    .then(res => { // accedemos a la data devuelta por axios. Por cada elemento del arreglo, retornamos un objeto solo con la siguiente info de la API y lo pusheamos a nuestro arreglo videogames.
        return {
            name: res.data.name,
            id: res.data.id,
            released: res.data.released,
            rating: res.data.rating,
            background_image: res.data.background_image,
            platforms: res.data.platforms.map(p => p.platform.name),
            genres: res.data.genres.map(g => { return { id: g.id, name: g.name } }),
            description: res.data.description_raw,
        }
    })
    )
    return videogames
} catch (err) {console.log(err)}
}