const db = require('./index')
const filmModel = require('../models/film')
async function addFilm(film){
    const filmAfterAdd = await db.films.insertOne(film)
    return filmAfterAdd
}

async function findFilmById(id){
    const film = await db.films.findOne({
        id:parseInt(id)
    })
    return film
}

async function findManyFilm(params){
    const {page,limit,id,genres,actor} = params
    
    const films = await db.films.aggregate([
    {
        $match:{
            $or:[{country:"united states"}]
        }
    }]).toArray()
    console.log(films);
}

async function findNewFilm(limit){
    if(limit){
       let films = await db.films.aggregate([
            {
                $sort:{dateUpdate:-1}
            },
            {
                $limit:limit
            }
        ]).toArray()
        return films
    }
    else{
        let films = await db.films.aggregate([
            {
                $sort:{dateUpdate:-1}
            }
        ]).toArray()
        return films
    }
}

module.exports = { addFilm, findFilmById,findManyFilm,findNewFilm }