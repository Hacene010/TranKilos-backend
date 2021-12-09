const express = require('express');

const router = express.Router();
const { db } = require('../conf');

router.get('/', async (req, res) => {
  const sql = `
    SELECT id, sex, firstname, lastname, email FROM users`;
  const [results] = await db.query(sql);
  res.json(results);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT
    sex, firstname, lastname, email
  FROM
    users
  WHERE
    id=?`;
  const sqlValues = [id];
  const [[results]] = await db.query(sql, sqlValues);
  res.json(results);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { sex, firstname, lastname, email } = req.body;
  const sql = `
  UPDATE
    users
  SET
   sex=?, firstname=?, lastname=?, email=?,
  WHERE
    id=?`;
  const sqlValues = [sex, firstname, lastname, email, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(500).send('Generic error message');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  DELETE FROM
    users
  WHERE
    id=?`;
  const sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});

module.exports = router;
