const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const wordsRouter = require('./routes/api/words');
const usersRouter = require('./routes/api/users');
const dictionaryRouter = require('./routes/api/dictionary');
const feedbackRouter = require('./routes/api/feedback');

const allowedOrigins = [process.env.FRONTEND_URL];

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static('public'));

app.use('/api/words', wordsRouter);
app.use('/api/users', usersRouter);
app.use('/api/dictionaries', dictionaryRouter);
app.use('/api/feedback', feedbackRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
