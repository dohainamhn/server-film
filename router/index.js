const express = require('express');
const authRouter = require('./auth');
const filmRouter = require('./film')
const jwt = require('jsonwebtoken')
const router = express.Router();

router.use('/auth',authRouter);

router.use('/film',filmRouter)

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split(' ')[1]
    if(token==null) res.status(403).json('you is not allowed')
    else{
        jwt.verify(token,process.env.MY_JWT_KEY,(err,user)=>{
            if(err) res.status(403).json('you is not allowed')
            else{
                req.user = user
                next()
            }
        })
    }
}

module.exports = router