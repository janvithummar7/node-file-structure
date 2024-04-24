const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors());


app.get('/api/routes', (req, res) => {
  const filePath = '../api/folder1/routes.json';

  fs.readFile(filePath, 'utf8', (data) => {
    try {
      const routes = JSON.parse(data);
      res.json(routes);
    } catch (err) {
      console.error('Error: ', err);
      res.status(500).json();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
