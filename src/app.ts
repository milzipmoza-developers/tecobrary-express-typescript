import {libraryBookRouterFactory} from "./librarybook/router/libraryBookRouterFactory";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

import {userRouterFactory} from './user/router/userRouterFactory';
import {naverApiRouterFactory} from './common/router/naverApiRouterFactory';
import {serialRouterFactory} from "./serial/router/serialRouterFactory";

export const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome Tecobrary Api v1');
});

app.use(userRouterFactory());
app.use(libraryBookRouterFactory());
app.use(serialRouterFactory());

app.use(naverApiRouterFactory());
