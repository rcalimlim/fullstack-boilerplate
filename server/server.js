// dotenv must be required as early as possible for env vars to propogate
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT;
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/dist'));

app.get('/', (req, res) => {
  res.status(200).send('Get request successful!');
});

app.listen(port, () => console.log(`Server is running on ${port}`));
