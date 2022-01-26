const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: '*',
  method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json('express-starter');
});

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
