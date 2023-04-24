const express = require('express');
const app = express();
const cors  = require('cors');
const port = 6001;

app.use(cors());

const rooms = require('./rooms.json');
const images = require('./images.json');

app.get('/rooms',(req,res)=>{
    res.send(rooms)
})
app.get('/images',(req,res)=>{
    res.send(images)
})

app.listen(port ,()=>{
    console.log(`hotel five on port ${port}`)
})