// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require body-parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const listening = () => {
  console.log('server running on localhost:' + port);
};

const server = app.listen(port, listening);

// get route
const allData = (req, res) => {
  res.send(projectData);
  projectData = [];
};

app.get('/all', allData);

// post route

const postData = (req, res) => {
  console.log(req.body);
  newEntry = {
    data: req.body.data,
    temp: req.body.temp,
    content: req.body.content
  };
  projectData.push(newEntry);
};

app.post('/add', postData);
