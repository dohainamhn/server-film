const router = require('express').Router()
const filmServices = require('../services/film')

router.post('/post-film', async (req,res)=>{
    const film={
        engName: req.body.engName,
        vieName: req.body.vieName,
        image:req.body.image,
        largeImage:req.body.largeImage,
        urlVideo:req.body.videoUrl,
        actors:req.body.actors,
        country:req.body.country,
        genres:req.body.genres,
        description: req.body.description
    }
    try{
        await filmServices.addFilm(film)
        res.status(200).json('add film successfully')
    }
    catch(err){
        res.status(400).json('cannot add film')
    }
})

router.get('/get-film', async (req,res)=>{
    console.log(req.query);
    const {newFilm,hot,genres,actor,country,page,limit,id} = req.query
    if(newFilm){
       try{
            let films = await filmServices.getNewFilm(limit)
            res.status(200).json(films)
       }
       catch(err){
            res.status(400).json('cant not get films')
       }
    }
    else if(id){
        try{
            let films = await filmServices.getFilmById(id)
            res.status(200).json(films)
       }
       catch(err){
            res.status(400).json('cant not get films')
       }
    }
}) 

module.exports = router