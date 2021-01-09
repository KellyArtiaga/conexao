var express = require('express');
var bodyparse = require('body--parse');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongobd://localhost:27017/auth_test',
    { useNewUrlParse: true });

app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

app.listen(3000)