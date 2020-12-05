require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')
require('./repositories')
const app = express();

const corsConfig ={
    origin: 'http://localhost:3000'
}

app.use(cors())
app.use(bodyParser.json())
app.use('/',router)





app.listen(3200,()=>{
    console.log('app running 3200');
})