const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, img, category, area, instructions FROM dish'
    );

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT id, name, img, category, area, instructions FROM dish WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
