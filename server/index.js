const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

require('./db');
app.use(bodyParser.urlencoded({
    extended: true
}));

//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(express.json({
    extended: false
}));

app.use('/', require('./routes/makeitshort'));

app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});