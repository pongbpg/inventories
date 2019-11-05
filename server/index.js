const { resolve } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const publicPath = resolve(__dirname, '..', 'dist');
const pino = require('express-pino-logger')();
const app = express();
const routers = require('./routes/index');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(db);
app.use('/api', routers);

app.get('*', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'))
});

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);