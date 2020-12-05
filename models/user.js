const crypto = require('crypto')

class user {
    constructor(userName,email,avatar="123",favoriteFilm=[]){
        this.userName = userName;
        this.email = email;
        this.avatar = avatar;
        this.favoriteFilm=favoriteFilm;
    }
    encodePassword(password){
        this.salt = crypto.randomBytes(256).toString('hex')
        this.password=crypto.pbkdf2Sync(password,this.salt,10000,255,'sha512').toString('hex')
    }
    verifyPassword(password){
        let newCryptoPassword = crypto.pbkdf2Sync(password,this.salt,10000,255,'sha512').toString('hex')
        return newCryptoPassword === this.password
    }
    returnJson(){
        return ({
            userName: this.userName,
            avatar: this.avatar,
            email:this.email,
            favoriteFilm: this.favoriteFilm
        })
    }
}

module.exports = user