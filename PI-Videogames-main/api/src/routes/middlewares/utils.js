const axios = require('axios');
const { Videogame, Genre } = require('../../db.js');
const {Op} = require('sequelize');
const {
    API_KEY
     } = process.env;

module.exports = {
    getApiGenres: getApiGenres,
    getApiVideogames: getApiVideogames,
    getDbVideogames: getDbVideogames,
    getAllVideogames: getAllVideogames,
    getVideogameById: getVideogameById
}


async function getApiGenres () {
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
    return apiGenres
}

async function getApiVideogames() {

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

async function getDbVideogames() {
    const videogames = await Videogame.findAll(
        {include: [{model: Genre, attributes: ['name', 'id'], through: {attributes: []}}]
    })
    return videogames
}

async function getAllVideogames() {
    const apiVideogames = await getApiVideogames();
    const dbVideogames = await getDbVideogames();
    const allVideogames = [...dbVideogames, ...apiVideogames];
    return allVideogames
}

async function getVideogameById (id){
    try{
    let videogames = []
    videogames.push(await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(res => {
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