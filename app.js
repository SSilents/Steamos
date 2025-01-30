const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const path = require('path')

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
app.get('/admin', function(req, resp) {
  resp.sendFile(__dirname + '/client/admin.html');
});

app.get('/api/bandmembers', function(req, resp) {
  fs.readFile('./data/bandmembers.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return resp.status(500).json({ message: 'Internal server error' });
    }
    try {
      const bandMembers = JSON.parse(data);
      resp.json(bandMembers);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      resp.status(500).json({ message: 'Internal server error' });
    }
  });
});

app.get('/api/music', function(req, resp) {
  fs.readFile(path.join(__dirname, 'data', 'music.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return resp.status(500).json({ message: 'Internal server error' });
    }
    try {
      const music = JSON.parse(data);
      resp.json(music);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      resp.status(500).json({ message: 'Internal server error' });
    }
  });
});


app.get('/api/enquiries/monthyear', function(req, resp) {
  const {month, year} = req.query;
  fs.readFile('./data/enquiries.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return resp.status(500).json({ message: 'Internal server error' });
    }

    let enquiries = [];
    if (data) {
      try {
        enquiries = JSON.parse(data);
        if (!Array.isArray(enquiries)) {
          enquiries = [];
        }
      } catch (e) {
        console.error('Error parsing JSON:', e);
        enquiries = [];
      }
    }

    const filteredEnquiries = enquiries.filter(enquiry => {
      const enquiryDate = new Date(enquiry.date);
      return enquiryDate.getMonth() + 1 === parseInt(month) && enquiryDate.getFullYear() === parseInt(year);
    });


    filteredEnquiries.sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison !== 0) {
        return dateComparison;
      }
      const startTimeA = new Date(`01/01/2000 ${a.startTime}`);
      const startTimeB = new Date(`01/01/2000 ${b.startTime}`);
      return startTimeA - startTimeB;
    });
    
    resp.json(filteredEnquiries);
});
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
  
fs.readFile('./data/enquiries.json', 'utf8', function(err, data) {
  if (err) {
    console.error('Error reading file:', err);
    return resp.status(500).json({ message: 'Internal server error' });
  }

  let enquiries = [];
  if (data) {
    try {
      enquiries = JSON.parse(data);
      if (!Array.isArray(enquiries)) {
        enquiries = [];
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
      enquiries = [];
    }
  }

  const newEnquiry = {
    name: name,
    email: email,
    date: date,
    startTime: startTime,
    endTime: endTime,
    address: address,
    extraInfo: extraInfo
  };
  enquiries.push(newEnquiry);

  fs.writeFile('./data/enquiries.json', JSON.stringify(enquiries, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return resp.status(500).json({ message: 'Internal server error' });
    }

    resp.sendStatus(200);;
  });
  
});



});

module.exports = app;