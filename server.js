const express = require('express')
const app = express()

app.use(express.static('client'));

app.get('/', function(req, resp){
  resp.send('Hello world')
})

app.listen(8090)