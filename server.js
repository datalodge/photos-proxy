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
    target: 'http://ec2-54-219-159-237.us-west-1.compute.amazonaws.com',
    changeOrigin: true
  })
);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I'm serving from port ${port}`);
});
