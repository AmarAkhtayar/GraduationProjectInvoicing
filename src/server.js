const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
// tslint:disable-next-line:only-arrow-functions typedef
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
