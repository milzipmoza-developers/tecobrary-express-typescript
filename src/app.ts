const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const userRouterFactory = require('./user/userRouterFactory');

export const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(userRouterFactory());

app.get('/', (req, res) => {
    res.send('Welcome Tecobrary Api v1');
});