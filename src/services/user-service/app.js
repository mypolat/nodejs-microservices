const express = require('express');
const app = express();
const sequelize = require('sequelize');

const port = process.env.PORT;

app.get('/', function (req, res) {
  res.send('hello world');
})

app.listen(port,()=>{
    console.log(port);
});