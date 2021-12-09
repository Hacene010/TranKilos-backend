const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort } = require('./conf');

const app = express();
const users = require('./routes/users');
const dishes = require('./routes/dishes');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/users', users);
app.use('/dishes', dishes);

app.use('/auth', auth);

app.use('/', (req, res) => {
  res.status(404).send(`Page not found : ${req.url}`);
});

app.listen(backPort, () => {
  console.log(`API now available on http://localhost:${backPort} !`);
});
