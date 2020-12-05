const repoUser = require('../repositories/user')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


const  signUp = async (user)=>{
    let findUser = await repoUser.findUserByEmail(user.email)
    if(findUser){
        throw new Error('email has existed')
    }
    const newUser = new userModel(user.userName,user.email)
    newUser.encodePassword(user.password)
    const userAfterAdd = await repoUser.addNewUser(newUser)
    return userAfterAdd.returnJson()
}

const signIn = async(user)=>{
    let findUser = await repoUser.findUserByEmail(user.email)
    if(!findUser){
        throw new Error('email does not exist')
    }
    if(!findUser.verifyPassword(user.password)){
        throw new Error('password is not correct')
    }
    let accessToken = jwt.sign(user,process.env.MY_JWT_KEY,{expiresIn:"3600s"})
    return {
        accessToken: accessToken,
        user: findUser.returnJson()
    }
}

module.exports = { signUp , signIn }