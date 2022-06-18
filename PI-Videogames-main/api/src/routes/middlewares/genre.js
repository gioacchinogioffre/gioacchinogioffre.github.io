var express = require('express');
const router = express.Router();
// const { Op, Videogame, Genre } = require('/PI-Videogames-main/api/src/db.js');

module.exports = router;


router.get('/', (req, res) => {
    res.send('estos son los generos')
})
