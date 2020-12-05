const mongodb = require('mongodb');
const db = {
    users:null,
    films:null,
}

const client = new mongodb.MongoClient('mongodb+srv://dohainamhn:0122468798@cluster0.xw2qe.mongodb.net?retryWrites=true&w=majority',{ useUnifiedTopology: true })

client.connect().then(async(connected)=>{
    const database = client.db('film-web')
    db.users = database.collection('users')
    db.films = database.collection('films')
})

module.exports = db