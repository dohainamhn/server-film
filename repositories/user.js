const db = require('./index')
const userModel = require('../models/user')


const addNewUser = async (user)=>{
    let rawInsertedUser = await  db.users.insertOne({
        userName:user.userName,
        password:user.password,
        salt: user.salt,
        email:user.email,
        avatar:user.avatar
    })
    const {userName,email,avatar} = rawInsertedUser.ops[0]
    return new userModel(userName,email,avatar)
}

const findUserByEmail = async (email)=>{
    let rawUser = await db.users.findOne({
        email:email
    })
    let user
    if(rawUser){
        const {userName,email, avatar} = rawUser
      user = new userModel(userName,email,avatar)
      user.password = rawUser.password
      user.salt = rawUser.salt
      user.favoriteFilm = rawUser.favoriteFilm
    }
    return user
}

module.exports = { addNewUser ,findUserByEmail }