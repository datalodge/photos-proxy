const newrelic = require('newrelic')
const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
const compress = require('compression');


const app = express();
const port = 9000;

app.use(cors());
app.use(compress());

app.use(
  '/pictures',
  proxy({
    target: 'http://localhost:3001',
    changeOrigin: true
  })
);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I'm serving from http://localhost:${port}`);
});
