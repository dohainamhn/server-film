const repoFilm = require('../repositories/film')
const filmModel = require('../models/film')

const addFilm = async (film)=>{
    const {engName,vieName,image,largeImage,urlVideo,actors,country,genres,description} = film
    let randomId = null
    let filmId = null
    do{
        randomId = Math.floor(Math.random()*100000)+1000
        filmId = await repoFilm.findFilmById(randomId)
    }
    while(filmId)
    const newFilm = new filmModel(engName,vieName,urlVideo,image,largeImage,actors,country,genres,description)
    newFilm.id = randomId
    const addFilm = await repoFilm.addFilm(newFilm)
    return addFilm
}

const getFilmById =async (id)=>{
    return await repoFilm.findFilmById(id)
}

const getNewFilm = async (params)=>{
    const films = await repoFilm.findNewFilm(params)
    return films
}

module.exports = {addFilm, getFilmById ,getNewFilm}