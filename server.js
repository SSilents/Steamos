const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(express.static('client'));



app.get('/homepage', function(req, resp) {
  resp.sendFile(__dirname + '/client/homepage.html');
});
app.get('/requestform', function(req, resp) {
  resp.sendFile(__dirname + '/client/requestform.html');
});
app.get('/music', function(req, resp) {
  resp.sendFile(__dirname + '/client/music.html');
});

app.post('/api/submitform', function(req, resp) {
  console.log('Request Body:', req.body);
  let name = req.body.name;
  let email = req.body.email;
  let date = req.body.gigdate;
  let startTime = req.body.gigstarttime;
  let endTime = req.body.gigendtime;
  let address = req.body.addresstextbox;
  let extraInfo = req.body.extrainfotextbox;
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Date:', date);
  console.log('Start Time:', startTime);
  console.log('End Time:', endTime);
  console.log('Address:', address);
  console.log('Extra Info:', extraInfo);
  
  resp.json(200);
});

app.listen(8090)