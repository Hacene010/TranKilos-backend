const express = require('express');
const cors = require('cors');
const { db, backPort } = require('./conf');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/dishes', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, img, category, area FROM dish'
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, name, img, category, area FROM dish WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(200).json(results);
    console.log(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(backPort, () => {
  console.log(`API now available on http://localhost:${backPort} !`);
});
