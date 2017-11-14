require('./config/config');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Starting express server in port ${port}`);
});