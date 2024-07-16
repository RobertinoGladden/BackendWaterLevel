const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store the latest water level data
let latestWaterLevel = 0;

// Endpoint to receive data from the Arduino
app.post('/update', (req, res) => {
  const value = req.body.value;
  if (value !== undefined) {
    latestWaterLevel = value;
    console.log(`Received water level: ${value}`);
    res.send('Data received');
  } else {
    res.status(400).send('Invalid data');
  }
});

// Endpoint to get the latest water level data
app.get('/latest', (req, res) => {
  res.json({ waterLevel: latestWaterLevel });
});

// Serve the static HTML file
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
