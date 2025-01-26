const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.static('client'));

app.get('/', function(req, resp){
  resp.send('Hello world')
})

let instruments = [ 'piano', 'concertina', 'double bass'];

app.get('/list', function (req, resp){
    resp.send(instruments);
});

app.listen(8090)