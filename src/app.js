const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const api = require('./api');
//require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.set('view engine', 'pug')

// app.get('/', (req, res, next) => {
//   res.render('index');
// });

// app.get('/about', (req, res, next) => {
//   res.render('about');
// });

// app.get('/info', (req, res, next) => {
//   res.render('info', { wordsCount: 21 });
// });

app.use('/api', api);

module.exports = app;
