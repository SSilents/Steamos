const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.static('client'));

app.get('/', function(req, resp){
  resp.send('Hello world')
})


app.get('/homepage', function(req, resp) {
  resp.sendFile(__dirname + '/client/homepage.html');
});
app.get('/requestform', function(req, resp) {
  resp.sendFile(__dirname + '/client/requestform.html');
});
app.get('/music', function(req, resp) {
  resp.sendFile(__dirname + '/client/music.html');
});
app.listen(8090)