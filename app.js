const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Memperbarui agar port dapat disesuaikan oleh Vercel

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simpan data level air terbaru
let latestWaterLevel = 0;

// Endpoint untuk menerima data dari Arduino
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

// Endpoint untuk mendapatkan data level air terbaru
app.get('/latest', (req, res) => {
  res.json({
    waterLevel: latestWaterLevel
  });
});

// Endpoint untuk menampilkan halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
