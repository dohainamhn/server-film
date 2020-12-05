const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {signUp,signIn} = require('../services/auth')
const {findUserByEmail} = require('../repositories/user')

router.post('/sign-up', async (req,res)=>{
    const {userName, email, password} = req.body
    try{
        const user = await signUp({
            userName: userName,
            email: email,
            password:password,
        })
        res.json(user)
    }
    catch(err){
        console.log(err.message);
        res.status(400).json(err.message)
    }
})

router.post('/sign-in',async(req,res)=>{
    const{email,password} = req.body
    try{
        const response = await signIn(
            {
                email: email,
                password:password
            }
        )
        res.json({
            "accessToken" : response.accessToken,
            "user": response.user
        })
    }
    catch(err){
        res.status(400).json(err.message)
    }
})

router.post('/me',(req,res)=>{
    const token = req.headers['authorization']
    const jsonWebToken = token.split(' ')[1]
    jwt.verify(jsonWebToken,process.env.MY_JWT_KEY, async (err,user)=>{
        if(err) res.status(401).json('user is not valid')
        else{
            let findUser = await findUserByEmail(user.email)
            res.status(200).json(findUser.returnJson())
        }
    })
})

module.exports = router
